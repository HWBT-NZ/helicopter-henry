# 🚁 Helicopter Henry: Just Get Good

A single-file, offline arcade flyer. Dodge the pipes, shoot the baddies, chase the combo.
No build step, no dependencies, no internet needed. **Just open `index.html` in a browser.**

## Play

- **Fly:** hold `SPACE` / left-mouse / tap-and-hold to rise, release to fall.
- **Shoot:** `F` or right-click. On a tablet/phone: **double-tap** to shoot, or use the on-screen **FIRE** button.
- The run starts level: Henry flies horizontally until you first press to fly.
- Milestones every 250 points. Collect coins and gems, grab power-ups, survive on 3 hearts.

### Keys

| Key | Action |
| --- | --- |
| `SPACE` / click / tap-hold | Fly up |
| `F` / right-click / double-tap | Shoot |
| `G` | Garage (spend coins on upgrades + trail skins) |
| `P` | Pause |
| `M` | Mute |
| `` ` `` | Toggle FPS overlay |

## Features

- Fixed-timestep engine with slow-mo near-misses and hit-stop juice.
- Trauma screen-shake, pooled particles, a long color-cycling neon trail.
- WebAudio chiptune that layers up with your combo, plus three custom recorded sounds
  (milestone sting, gun, and looping title theme) base64-embedded in the file.
- Three biomes, moving Mario-style pipes (always a navigable gap), saws, lasers, mines,
  three baddie types, a blimp mini-boss, and timed power-ups (shield / magnet / slow-mo).
- Starts easy and ramps up with distance. Coins persist in `localStorage`; buy upgrades in the Garage.

## Tech

Plain HTML5 canvas + JavaScript in one `index.html` (~350 KB, audio included). No libraries.

🤖 Built with [Claude Code](https://claude.com/claude-code)
