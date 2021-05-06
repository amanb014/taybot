import { WebClient } from "@slack/web-api";

export const CreateNewBot = () => new WebClient(process.env.SLACK_TOKEN);
