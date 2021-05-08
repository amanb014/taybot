import { CronJob } from "cron";
import { TAYLOR_ID } from "./app/constants";
import { findRandomSong, getAccessToken } from "./app/spotify";
import { CreateNewBot, postSlackMessage } from "./app/taybot";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "./../../.env"),
});

const taybot = CreateNewBot();
const sendMessage = () => {
  const song = findRandomSong(TAYLOR_ID);
  postSlackMessage("", taybot);
};

const job = new CronJob({
  cronTime: "* * * * * *",
  onTick: sendMessage,
});

// job.start();
getAccessToken();
