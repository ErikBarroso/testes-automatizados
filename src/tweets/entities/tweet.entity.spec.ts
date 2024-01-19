import mongoose, { mongo } from "mongoose";
import { Tweet, TweetSchema } from "./tweet.entity";

describe("Tweet Tests", () => {
  //Teste de unidade
  describe("Tweet Class", () => {
    it("should create a tweet", () => {
      const tweet = new Tweet({
        content: "Hello World",
        screen_name: "DevErik",
      });

      expect(tweet.content).toBe("Hello World");
      expect(tweet.screen_name).toBe("DevErik");
    });
  });

  //teste de integração - menos rapido e mais custoso que unitario
  describe("Using MongoDB", () => {
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      try {
        conn = await mongoose.connect(
          `mongodb://root:root@localhost:27017/tweets_entity_test?authSource=admin`,
        );
      } catch (error) {
        console.error("Error establishing MongoDB connection:", error);
      }
    });

    afterEach(async () => {
      try {
        if (conn) {
          await conn.disconnect();
        }
      } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
      }
    });

    it("create a tweet document", async () => {
      const TweetModel = conn.model("Tweet", TweetSchema);
      const tweet = new TweetModel({
        content: "Hello World",
        screen_name: "DevErik",
      });
      await tweet.save();

      const tweetCreated = await TweetModel.findById(tweet._id);

      expect(tweetCreated.content).toBe("Hello World");
      expect(tweetCreated.screen_name).toBe("DevErik");
    });
  });
});
