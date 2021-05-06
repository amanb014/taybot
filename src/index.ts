import { CronJob } from "cron";
import { TAYLOR_ID } from "./app/constants";
import { findRandomSong } from "./app/spotify";
import { CreateNewBot, postSlackMessage } from "./app/taybot";

const taybot = CreateNewBot();
const sendMessage = () => {
  const song = findRandomSong(TAYLOR_ID);
  postSlackMessage("", taybot);
};

const job = new CronJob({
  cronTime: "* * * * * *",
  onTick: sendMessage,
});

job.start();
