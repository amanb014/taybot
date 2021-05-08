import axios from "axios";
import { getBase64Encoded } from "../utils";
import { getTokens, storeTokens } from "./datastore";
const querystring = require("querystring");
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

type Track = any;

const Songs: Track[] = [];

const tokenStore: TokenStore = {
  expiresAt: 1620493357989,
  accessToken:
    "BQB2pJ0lEXCQsScUUTX5by6XWc3u19FexRnNeB-ICFpRYmd81KcPLustUjEAdhnUozhcEKr0MN0BBFOQHLA",
};

export const getAccessToken: () => Promise<TokenStore> = async () => {
  const fromStore = await getTokens();
  return tokenStore;

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
  return tokens;
};

const getAllSongsForPlaylist: (
  playlistId: string,
  next?: string
) => Promise<Track[]> = async (playlistId: string, next?: string) => {
  const url = next
    ? next
    : `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`;
  const params = {
    limit: 100,
  };
  const token = await getAccessToken();

  const response = await axios.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  const nextLink = response.data.next;
  const items: any[] = response.data.items;

  if (nextLink) {
    return items.concat(await getAllSongsForPlaylist(null, nextLink));
  }
  return items;
};

export const getAllSongsForPlaylists: (
  ids: string[]
) => Promise<Track[]> = async (paylistIds: string[]) => {
  const promises: Promise<any[]>[] = [];
  paylistIds.forEach((id) => {
    promises.push(getAllSongsForPlaylist(id));
  });
  const values: any[] = await Promise.all(promises);

  return values.reduce((acc, current) => {
    return [...acc, ...current];
  }, []);
};

export const findRandomSong = (artistId: string) => {
  // TODO
};
