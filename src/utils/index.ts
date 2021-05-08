export const getBase64Encoded = (value: string) =>
  Buffer.from(value).toString("base64");
