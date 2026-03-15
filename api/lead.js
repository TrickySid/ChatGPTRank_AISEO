const postgres = require("postgres");

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

module.exports = async function handler(req, res) {
  // Always handle GET cleanly (so visiting /api/lead doesn't crash)
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }

  // Check env var BEFORE creating a client
  const conn = process.env.SUPABASE_POSTGRES_URL;
  if (!conn) return json(res, 500, { ok: false, error: "Missing SUPABASE_POSTGRES_URL" });

  let sql;
  try {
    sql = postgres(conn, {
      ssl: "require",
      max: 1,
      idle_timeout: 10,
      connect_timeout: 10,
    });
  } catch (e) {
    console.error("Postgres client init failed:", e);
    return json(res, 500, { ok: false, error: "DB client init failed" });
  }

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
    `;

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("Lead insert failed:", err);
    return json(res, 500, { ok: false, error: "Server error" });
  }
};