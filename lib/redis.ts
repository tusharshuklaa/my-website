import { UNIQUE_VIEW_KEY } from "@/app/api/constants";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helper function to generate a unique key for a user's view
export function getUserViewKey(slug: string, userIdentifier: string) {
  return `${UNIQUE_VIEW_KEY}${slug}:${userIdentifier}`;
}
