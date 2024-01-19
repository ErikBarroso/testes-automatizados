import mongoose, { mongo } from "mongoose";
import { Tweet, TweetSchema } from "./tweet.entity";

describe("Tweet Tests", () => {
  it("should create a tweet", () => {
    const tweet = new Tweet({
      content: "Hello World",
      screen_name: "DevErik",
    });

    expect(tweet.content).toBe("Hello World");
    expect(tweet.screen_name).toBe("DevErik");
  });

  it("create a tweet document", async () => {
    const conn = await mongoose.connect(
      `mongodb://root:root@db:27017/tweets_test?authSource=admin`,
    );
    const TweetModel = conn.model("Tweet", TweetSchema);
    const tweet = new TweetModel({
      content: "Hello World",
      screen_name: "Luiz Carlos",
    });
    await tweet.save();
  });
});
