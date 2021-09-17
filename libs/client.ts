import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "osayubot",
  apiKey: process.env.MICRO_CMS_API_KEY,
});
