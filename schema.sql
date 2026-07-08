-- Helicopter Henry global leaderboard (Cloudflare D1)
CREATE TABLE IF NOT EXISTS scores (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  score      INTEGER NOT NULL,
  created_at INTEGER NOT NULL          -- ms epoch, tie-breaker (earliest wins)
);

-- Fast "top N by score" ordering.
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores (score DESC, created_at ASC);
