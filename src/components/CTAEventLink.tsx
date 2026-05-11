'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';

type CTAEventLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ctaId: string;
  placement: string;
};

const ANALYTICS_ENDPOINT = '/api/cta-click';

function trackCtaClick(payload: { ctaId: string; placement: string; href: string }) {
  const body = JSON.stringify({
    ...payload,
    ts: new Date().toISOString(),
  });

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
      return;
    }

    void fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // never block navigation if analytics fails
  }
}

export default function CTAEventLink({ ctaId, placement, href = '', onClick, ...props }: CTAEventLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackCtaClick({
      ctaId,
      placement,
      href: String(href),
    });
  };

  return <a {...props} href={href} onClick={handleClick} />;
}
