// cors.ts — shared origin allowlist for every /api/* endpoint.
//
// Single source of truth so a temporary/pre-launch entry (see the note
// below) only ever needs removing in one place, and so a new endpoint can't
// accidentally drift from the chat endpoint's allowlist.

// TEMPORARY (added 2026-07-19, see decisions.md): the .vercel.app entry is
// pre-launch-only, for testing the deployed site before viewbens.work is cut
// over to this project. Remove it once the domain cutover happens.
export const ALLOWED_ORIGINS = [
  'https://viewbens.work',
  'https://bmax-portfolio.vercel.app',
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
