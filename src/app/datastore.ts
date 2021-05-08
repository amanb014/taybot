import * as Datastore from "nedb";

const db = new Datastore({
  filename: "./taybot.db",
  autoload: true,
});

export enum DocType {
  TOKENS = "tokens",
  SONGS = "songs",
}

export const storeTokens = (token: TokenStore) => {
  return new Promise((resolve, reject) => {
    db.insert({ docType: "tokens", ...token }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const getTokens = async () => {
  return new Promise((resolve, reject) => {
    db.findOne({ docType: DocType.TOKENS }, (err, doc) => {
      console.log(doc);
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
