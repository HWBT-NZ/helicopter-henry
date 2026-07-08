// Cloudflare Pages Function: /api/scores
// GET  -> { scores: [{n,s}, ...] }  (global top 10, highest first)
// POST { name, score } -> inserts, then returns the refreshed top 10
//
// Bind a D1 database to this Pages project as `DB` (see README / wrangler.toml).
// If no DB is bound the endpoint degrades to an empty list so the game still
// runs on its local (offline) high-score table.

const TOP_N = 10;
const NAME_RE = /[^A-Z0-9.!-]/g;          // matches the game's CHARS set
const MAX_SCORE = 100_000_000;            // sanity ceiling to reject garbage

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function topScores(db) {
  const { results } = await db
    .prepare('SELECT name, score FROM scores ORDER BY score DESC, created_at ASC LIMIT ?')
    .bind(TOP_N)
    .all();
  return (results || []).map((r) => ({ n: r.name, s: r.score }));
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ scores: [], offline: true });
  try {
    return json({ scores: await topScores(env.DB) });
  } catch (e) {
    return json({ scores: [], error: 'db' }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ scores: [], offline: true });

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad json' }, 400);
  }

  let name = String(body?.name ?? '')
    .toUpperCase()
    .replace(NAME_RE, '')
    .slice(0, 3);
  if (!name) name = 'HEN';

  const score = Math.floor(Number(body?.score));
  if (!Number.isFinite(score) || score <= 0 || score > MAX_SCORE) {
    return json({ error: 'bad score' }, 400);
  }

  try {
    await env.DB.prepare('INSERT INTO scores (name, score, created_at) VALUES (?, ?, ?)')
      .bind(name, score, Date.now())
      .run();
    return json({ scores: await topScores(env.DB) });
  } catch (e) {
    return json({ error: 'db' }, 500);
  }
}
