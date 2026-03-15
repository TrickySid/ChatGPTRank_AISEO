import postgres from "postgres";

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(obj));
}

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.length <= 254;
}

function isSafeUrl(u) {
  try {
    const url = new URL(u);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    if (url.hostname === "localhost" || url.hostname.endsWith(".local")) return false;
    return u.length <= 2048;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  // Always handle non-POST cleanly
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }

  const conn = process.env.SUPABASE_POSTGRES_URL;
  if (!conn) return json(res, 500, { ok: false, error: "Missing SUPABASE_POSTGRES_URL" });

  // init only on POST
  const sql = postgres(conn, {
    ssl: "require",
    max: 1,
    idle_timeout: 10,
    connect_timeout: 10,
  });

  try {
    const { name, email, auditUrl } = req.body || {};

    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanAuditUrl = (auditUrl || "").trim();

    if (!cleanName) return json(res, 400, { ok: false, error: "Name is required" });
    if (!isValidEmail(cleanEmail)) return json(res, 400, { ok: false, error: "Valid email is required" });
    if (cleanAuditUrl && !isSafeUrl(cleanAuditUrl)) {
      return json(res, 400, { ok: false, error: "Invalid auditUrl" });
    }

    await sql`
        insert into public.leads (name, email, audit_url)
        values (${cleanName}, ${cleanEmail}, ${cleanAuditUrl || null})
        on conflict (email) do update set
            name = excluded.name,
            audit_url = excluded.audit_url,
            created_at = now()
        `;

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("Lead insert failed:", err);
    return json(res, 500, { ok: false, error: "Server error" });
  }
}