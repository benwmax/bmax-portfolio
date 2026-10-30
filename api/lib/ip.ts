// ip.ts — the identity rate limits are keyed on, shared by chat and contact.
//
// IPv4 addresses are used as-is. IPv6 addresses are cut to their /64 prefix:
// a single home or cloud host is normally handed a whole /64, so keying on the
// full address would let one machine rotate through billions of fresh
// rate-limit buckets and drain the shared daily budgets on its own (found in
// the 2026-10-30 audit). Logs keep the raw address; only the limiter key
// changes.

export function rateLimitKey(ip: string): string {
  const addr = ip.trim().split('%')[0]; // drop any IPv6 zone id
  if (!addr.includes(':')) return addr;

  // IPv4-mapped IPv6 (::ffff:203.0.113.7) is really an IPv4 client.
  const mapped = addr.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped) return mapped[1];

  const [head, tail] = addr.split('::');
  const headParts = head ? head.split(':') : [];
  const tailParts = tail ? tail.split(':') : [];
  const missing = tail === undefined ? 0 : 8 - headParts.length - tailParts.length;
  const groups = [...headParts, ...Array<string>(Math.max(missing, 0)).fill('0'), ...tailParts];

  const prefix = groups
    .slice(0, 4)
    .map((g) => (parseInt(g, 16) || 0).toString(16))
    .join(':');
  return `${prefix}::/64`;
}
