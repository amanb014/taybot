import { WebClient } from "@slack/web-api";

export const CreateNewBot = () => new WebClient(process.env.SLACK_TOKEN);

// TODO find the type for message
export const postMessage = (client: WebClient, message: any) => {
  console.log(message);
};
