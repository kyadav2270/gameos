# 🎮 GameOS

**One game a day. 60 seconds. Play with your hands.**

A hand-tracking arcade hub built for daily content creation on YouTube Shorts and Instagram Reels. Multiple games. One shareable link. AI-era game influencer stack.

## Built on the Bruhzen Formula

Every 60-second arc follows: **DECLARE → ASSESS → ISOLATE → PROCESS → BUILD → REVEAL**

Each game is engineered for the three pillars:
- **Universally Relatable** — themes everyone knows (balloons, food cravings, fruit slicing, mosquitoes)
- **Completion Compulsion** — clear levels, progress bars, "next twist" reveals
- **Emotional Hook** — tier reveal, NEW HIGH SCORE, screen shake, satisfying SFX

## Games (V1 launch — more added weekly)

| Game | Mechanic | Universal Hook |
|---|---|---|
| 🎈 Balloon Pop | Tap with hands | Childhood joy |
| 🍔 Catch | Catch falling food | Hunger / cravings |
| 🍉 Fruit Slice | Hand-velocity slash | Fruit Ninja nostalgia |
| 🦟 Mosquito Smash | Whack hovering bugs | Indian summer pain |

## Features

- **9:16 canvas at 1080×1920** — Reels/Shorts ready
- **Face swap** — 17 emoji/cartoon options (🐶 🐱 🤖 👽 🦄 🎃 …)
- **MP4 export with audio** (Chrome) · WebM fallback elsewhere
- **iPhone Continuity Camera** support (use iPhone back cam for premium quality)
- **Mobile-first** — works on iOS Safari & Chrome Android
- **iOS audio unlock** — bypasses iPhone silent switch
- **Per-game share links** — `?g=balloon`, `?g=slice`, etc.
- **Hover-to-select** with hand on home screen (no clicks needed)
- **Live stats** — visits, plays, completions per game

## URL routing

- Home: `https://kyadav2270.github.io/gameos/`
- Specific game: `https://kyadav2270.github.io/gameos/?g=slice`
- With face swap: `https://kyadav2270.github.io/gameos/?g=catch&face=panda`

## Stats

Live dashboard: [stats.html](https://kyadav2270.github.io/gameos/stats.html)

## How to play (creator workflow)

1. Open the hub on laptop (or iPhone with Continuity Camera for HQ)
2. Pick face swap if desired
3. Pick a game (or rotate daily)
4. Hit ⏺ Record
5. Hit ▶ Start — countdown begins, game runs 60s, end card lingers 4.5s
6. Hit ⬇ Download → upload to Reels/Shorts
7. Share game link in caption so viewers can play too

## Tech

- Single self-contained `index.html` (~1500 lines)
- MediaPipe Hands (gesture) + Face Detection (face swap)
- WebRTC `getUserMedia` + `MediaRecorder` (MP4/WebM)
- Web Audio API with master-gain → speakers + recording stream
- Canvas 2D rendering at 1080×1920 internal scaled via `setTransform`
- Zero build step. Pure HTML. GitHub Pages.

## Adding a new game

In `index.html`, define a game object:
```js
const G_NEW = {
  id, name, emoji, hue, declare, tag, twists,
  init() {}, update(dt) {}, draw() {},
};
```
Register in `GAMES = { ..., new: G_NEW }`. That's it.
