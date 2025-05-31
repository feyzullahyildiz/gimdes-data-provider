import type { Client } from "typesense";

export const createSearchOnlyApiKey = async (typesenseClient: Client) => {
  const description = "full-access-api-key";
  const currentKeys = await typesenseClient.keys().retrieve();
  console.log("currentKeys", currentKeys);
  //   const existingKey = currentKeys.find((key) => key.description === description);
  //   if (existingKey) {
  //     return existingKey;
  //   }
  const nextSearchOnlyApiKey = await typesenseClient.keys().create({
    description,
    actions: ["documents:search"],
    collections: ["*"],
  });
  console.log("apiKey", nextSearchOnlyApiKey);
  return nextSearchOnlyApiKey;
};
