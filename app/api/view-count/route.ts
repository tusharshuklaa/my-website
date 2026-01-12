import { NextResponse } from 'next/server';
import { getUserViewKey, redis } from '@/lib/redis';
import { VIEWS_COUNT_KEY } from '../constants';

type RequestBody = {
  slug: string;
  userIdentifier: string;
};

export async function POST(req: Request) {
  const { slug, userIdentifier }: RequestBody = await req.json();

  if (!slug || !userIdentifier) {
    return NextResponse.json({ error: 'Slug and user identifier are required' }, { status: 400 });
  }

  // Extract the IP address from the request
  const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  // Combine IP address and fingerprint for a unique identifier
  const combinedIdentifier = `${ipAddress}:${userIdentifier}`;

  // Check if the environment is production
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ success: true, message: 'View count not updated in non-production environment' });
  }

  // Check if the user has viewed this post in the last 24 hours
  const lastViewTimestamp = await redis.get(getUserViewKey(slug, combinedIdentifier));
  const currentTime = Date.now();
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  if (!lastViewTimestamp || currentTime - Number(lastViewTimestamp) > twentyFourHoursInMs) {
    // Increment the view count
    await redis.incr(`${VIEWS_COUNT_KEY}${slug}`);
    // Update the last view timestamp
    await redis.set(getUserViewKey(slug, combinedIdentifier), currentTime);
  }

  return NextResponse.json({ success: true });
}
