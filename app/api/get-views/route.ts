import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { VIEWS_COUNT_KEY } from "../constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const viewCount = await redis.get(`${VIEWS_COUNT_KEY}${slug}`);

  // Cache the response for 60 seconds
  const response = NextResponse.json({ views: viewCount || 0 });
  response.headers.set("Cache-Control", "public, s-maxage=60");
  return response;
}
