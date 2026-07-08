# 🚁 Helicopter Henry: Just Get Good

A single-file, offline arcade flyer. Dodge the pipes, shoot the baddies, chase the combo.
No build step, no dependencies, no internet needed. **Just open `index.html` in a browser.**

## Play

- **Fly:** hold `SPACE` / left-mouse / tap-and-hold to rise, release to fall.
- **Shoot:** `F` or right-click. On a tablet/phone: **double-tap** to shoot, or use the on-screen **FIRE** button.
- The run starts level: Henry flies horizontally until you first press to fly.
- Milestones every 250 points. Collect coins and gems, grab power-ups, survive on 3 hearts.
- **Bonus stage:** every so often the camera does a slow cinematic 3D flip into a top-down
  shmup — steer freely (drag / mouse / arrows-WASD) while Henry auto-fires. Grab **GUN UP**
  badges to grow your fire from a twin stream up to a 6-way spread, blast varied enemy squads
  (darts, weavers, strafers, tanks, kamikazes, orbiters, gunners) and a rotating boss
  (Carrier / Saucer / Destroyer), then it flips safely back with a stage-clear coin bonus.

### Keys

| Key | Action |
| --- | --- |
| `SPACE` / click / tap-hold | Fly up |
| `F` / right-click / double-tap | Shoot |
| Arrows / WASD / drag | Move (during the top-down bonus stage) |
| `G` | Garage (spend coins on upgrades + trail skins) |
| `P` | Pause |
| `M` | Mute |
| `` ` `` | Toggle FPS overlay |

## Features

- Fixed-timestep engine with slow-mo near-misses and hit-stop juice.
- Trauma screen-shake, pooled particles, a long color-cycling neon trail.
- WebAudio chiptune with **six switchable tracks** that rotate per biome (plus dedicated
  boss and "WARP DRIVE" bonus-stage themes), layering up with your combo, plus three custom
  recorded sounds (milestone sting, gun, and looping title theme) base64-embedded as MP3.
- Three biomes, moving Mario-style pipes (always a navigable gap), saws, lasers, mines,
  three baddie types, a blimp mini-boss, and timed power-ups (shield / magnet / slow-mo).
- A recurring **3D-flip bonus stage**: a slow cinematic camera pitch into a top-down vertical
  shooter with gun power-ups, varied enemy formations, and three rotating bosses; the return
  clears the lane and grants invulnerability so you never flip straight back into a pipe.
- Starts easy and ramps up with distance. Coins persist in `localStorage`; buy upgrades in the Garage.

## Leaderboard

There's a global high-score board (press **`L`** / the **SCORES** button on the title, or
beat a high score to be sent there after entering your initials). Scores are stored in a
**Cloudflare D1** database behind a tiny Pages Function at `/api/scores`. The game still runs
fully offline: if the API can't be reached it silently falls back to a per-device local board.

### Deploying the leaderboard (one-time setup)

The site deploys as a **Cloudflare Pages** project (static `index.html` + the `functions/` API).

```bash
# 1. create the database (copy the printed database_id into wrangler.toml)
npx wrangler d1 create helicopter-henry-scores

# 2. apply the schema to the remote DB
npx wrangler d1 execute helicopter-henry-scores --remote --file=./schema.sql

# 3. in the Cloudflare dashboard: Pages project -> Settings -> Functions ->
#    D1 database bindings -> add binding named  DB  -> helicopter-henry-scores
```

Local dev with the API: `npx wrangler pages dev .` (serves the static file + Functions,
using a local D1). Without any of this the game runs exactly as before, just offline-only.

## Tech

Plain HTML5 canvas + JavaScript in one `index.html` (~290 KB, audio included). No libraries.
Global leaderboard via a single Cloudflare Pages Function (`functions/api/scores.js`) + D1.

🤖 Built with [Claude Code](https://claude.com/claude-code)
