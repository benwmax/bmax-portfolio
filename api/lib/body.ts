// body.ts — read a JSON request body with a hard byte cap, shared by chat and contact.
//
// Both endpoints already reject a large Content-Length up front, but a chunked
// request has no Content-Length, so that check was skipped and req.json() read
// up to the platform limit (2026-10-30 audit). This counts bytes as they arrive
// and stops reading once the cap is passed.

export type JsonBodyResult =
  | { ok: true; data: unknown }
  | { ok: false; reason: 'too-large' | 'invalid-json' };

export async function readJsonCapped(req: Request, maxBytes: number): Promise<JsonBodyResult> {
  if (!req.body) return { ok: false, reason: 'invalid-json' };

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return { ok: false, reason: 'too-large' };
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, data: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, reason: 'invalid-json' };
  }
}
