// cors.ts — shared origin allowlist for every /api/* endpoint.
//
// Single source of truth so a temporary/pre-launch entry (see the note
// below) only ever needs removing in one place, and so a new endpoint can't
// accidentally drift from the chat endpoint's allowlist.

// Only the canonical domain is allowed in production. www.viewbens.work
// redirects to it, so it never sends requests itself. The pre-launch
// bmax-portfolio.vercel.app entry was removed at the domain cutover
// (2026-10-26, see decisions.md).
export const ALLOWED_ORIGINS = [
  'https://viewbens.work',
  'http://localhost:5173',
  'http://localhost:4173',
];

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Reject cross-origin browser requests outright. This doesn't stop
// non-browser callers (curl, scripts) — they don't send a trustworthy Origin
// header — but it does stop other sites' pages from riding a visitor's
// browser to call this endpoint.
export function isOriginAllowed(origin: string | null): boolean {
  return !origin || ALLOWED_ORIGINS.includes(origin);
}
