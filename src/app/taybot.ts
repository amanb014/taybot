import { WebClient } from "@slack/web-api";
import { TAYLOR_ID } from "./constants";
import { findRandomSong } from "./spotify";

export const CreateNewBot = () => new WebClient(process.env.SLACK_TOKEN);

export const postSlackMessage = (message: any, client: WebClient) => {
  console.log("message");
};
