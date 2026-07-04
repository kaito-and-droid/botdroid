const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_SOURCES = new Set(["marketplace", "cloud"]);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/waitlist") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ ok: false, error: "invalid_json" }, 400);
      }

      // Honeypot: bots fill every field. Pretend success, store nothing.
      if (typeof body.company === "string" && body.company.trim() !== "") {
        return json({ ok: true });
      }

      const email = typeof body.email === "string" ? body.email.trim() : "";
      if (email.length === 0 || email.length > 254 || !EMAIL_RE.test(email)) {
        return json({ ok: false, error: "invalid_email" }, 400);
      }

      const source = VALID_SOURCES.has(body.source) ? body.source : "unknown";

      await env.WAITLIST.put(
        `email:${email.toLowerCase()}`,
        JSON.stringify({ source, ts: Date.now() })
      );

      return json({ ok: true });
    }

    return env.ASSETS.fetch(request);
  },
};
