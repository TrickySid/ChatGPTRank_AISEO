const postgres = require("postgres");

const sql = postgres(process.env.SUPABASE_POSTGRES_URL, {
  ssl: "require",
  max: 1,
  idle_timeout: 10,
  connect_timeout: 10,
});

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
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  try {
    const { name, email, auditUrl } = req.body || {};

    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanAuditUrl = (auditUrl || "").trim();

    if (!cleanName) return res.status(400).json({ ok: false, error: "Name is required" });
    if (!isValidEmail(cleanEmail)) return res.status(400).json({ ok: false, error: "Valid email is required" });
    if (cleanAuditUrl && !isSafeUrl(cleanAuditUrl)) {
      return res.status(400).json({ ok: false, error: "Invalid auditUrl" });
    }

    await sql`
      insert into public.leads (name, email, audit_url)
      values (${cleanName}, ${cleanEmail}, ${cleanAuditUrl || null})
    `;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Lead insert failed:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};