import { NextRequest, NextResponse } from 'next/server';

type CtaEventPayload = {
  ctaId: string;
  placement: string;
  href: string;
  ts?: string;
};

const RATE_WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = 60;
const eventCounts = new Map<string, { count: number; windowStart: number }>();

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const current = eventCounts.get(clientKey);

  if (!current || now - current.windowStart > RATE_WINDOW_MS) {
    eventCounts.set(clientKey, { count: 1, windowStart: now });
    return false;
  }

  if (current.count >= MAX_EVENTS_PER_WINDOW) return true;

  current.count += 1;
  eventCounts.set(clientKey, current);
  return false;
}

function isValidPayload(payload: unknown): payload is CtaEventPayload {
  if (!payload || typeof payload !== 'object') return false;
  const p = payload as Partial<CtaEventPayload>;
  return (
    typeof p.ctaId === 'string' &&
    p.ctaId.length > 0 &&
    p.ctaId.length <= 64 &&
    typeof p.placement === 'string' &&
    p.placement.length > 0 &&
    p.placement.length <= 64 &&
    typeof p.href === 'string' &&
    p.href.length > 0 &&
    p.href.length <= 500
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ error: 'content-type must be application/json' }, { status: 415 });
  }

  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: 'rate limit exceeded' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json body' }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  console.info('[cta-click]', {
    ...payload,
    receivedAt: new Date().toISOString(),
    clientKey,
    userAgent: request.headers.get('user-agent') || 'unknown',
  });

  return NextResponse.json({ ok: true }, { status: 202 });
}
