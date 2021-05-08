import { CronJob } from "cron";
import { getAllSongsForPlaylists } from "./app/spotify";
import { CreateNewBot, postSlackMessage } from "./app/taybot";
import * as path from "path";
import * as dotenv from "dotenv";
import { TAYLOR_PLAYLISTS } from "./app/constants";
dotenv.config({
  path: path.join(__dirname, "./../../.env"),
});

const taybot = CreateNewBot();
const sendMessage = () => {
  // const song = findRandomSong(TAYLOR_ID);
  postSlackMessage("", taybot);
};

const job = new CronJob({
  cronTime: "* * * * * *",
  onTick: sendMessage,
});

getAllSongsForPlaylists(TAYLOR_PLAYLISTS).then((resp) =>
  console.log(resp.length)
);
