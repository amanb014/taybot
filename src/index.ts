import { CronJob } from "cron";
import { CreateNewBot, postMessage } from "./app/taybot";

const taybot = CreateNewBot();
const sendMessage = () => {
  postMessage(taybot, "hello");
};

const job = new CronJob({
  cronTime: "* * * * * *",
  onTick: sendMessage,
});

job.start();
