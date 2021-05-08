import axios from "axios";
import { getBase64Encoded } from "../utils";
import { getTokens, storeTokens } from "./datastore";
const querystring = require("querystring");

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

type SongMap = { [key: string]: any[] };
// const SongsByArtist: SongMap = [];

export const getAccessToken = async () => {
  const fromStore = await getTokens();
  if (fromStore) {
    console.log("returned from store");
    return fromStore;
  }

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_ACCESS_SECRET;
  const url = `https://accounts.spotify.com/api/token`;
  const encoded = getBase64Encoded(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await axios.post(
    url,
    querystring.stringify({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    }
  );
  const tokens: TokenStore = {
    expiresAt: Date.now() + response.data.expires_in,
    accessToken: response.data.access_token,
  };
  storeTokens(tokens);
};

const getAllPages = () => {};

export const getAllSongsForArtist = (artistId: string) => {
  const url = `${SPOTIFY_BASE_URL}/artists/${artistId}/albums`;
  const params = {
    limit: 50,
  };
};

export const findRandomSong = (artistId: string) => {
  // TODO
};
