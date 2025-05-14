import { Client } from "typesense";

interface Options {
  host: string;
  port: number;
  protocol: string;
  path?: string;
  url?: string;
}
export const createTypesenseClient = (options: Options, apiKey: string) => {
  const client = new Client({
    nodes: [options],
    apiKey: apiKey,
    connectionTimeoutSeconds: 5,
  });
  return client;
};
