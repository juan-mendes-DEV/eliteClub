/**
 * Production-only public URL helper. Set NEXT_PUBLIC_SITE_URL only after the
 * custom production domain has been approved. Preview and local deployments
 * deliberately omit canonical and social URLs.
 */
export function getProductionUrl(path: string): string | undefined {
  if (process.env.VERCEL_ENV !== 'production') return undefined;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredOrigin) return undefined;

  try {
    const origin = new URL(configuredOrigin);
    if (origin.protocol !== 'https:') return undefined;
    return new URL(path, origin).toString();
  } catch {
    return undefined;
  }
}
