# AI TV Starship — Design & Build Specification

## Overview

AI TV Starship is the media layer of the Imagine a World ecosystem. It is the promotional engine, the hype machine, the front door where audiences discover Rick McCawley's 18 projects as they are being built. It is not one of the 18 tiles — it lives above them as the persistent broadcast layer.

**Positioning:** AI TV Starship sits between the hero/bio and the two 3×3 project grids on rickmccawley.com. It also has its own standalone sub-site at `aitv.rickmccawley.com` that functions as a full media portal.

---

## Architecture

### On rickmccawley.com (Hub Integration)

AI TV Starship appears in THREE places on the hub:

1. **Top news crawl** — Already live. Ticker with LIVE badge, scrolling updates, + button opens news overlay.
2. **AI TV Starship section** — NEW. Positioned between the bio and the Star Missions grid. Three-column layout:
   - **Column 1: LIVE / NEXT SHOW** — Logo, next show date/time (Thursdays 8–10 PM ET), direct link to YouTube Live. Flashes "ON AIR" during broadcast hours.
   - **Column 2: LATEST EPISODE** — Embedded most recent full episode (2-hour show). Episode number, title, thumbnail. Clickable to YouTube.
   - **Column 3: MISSION TOOLS** — Latest Mission Tools episode with thumbnail, episode number. Below it: scrollable list of recent Mission Tools topics, each clickable to the Mission Tools playlist.
3. **Dark bar separator** — Near-black (#111) bar with "AI TV STARSHIP" in gold Bebas Neue centered. Sits as a cap above the two 3×3 grids. Signals: "Everything below is what the show is about."

### Standalone Sub-Site: aitv.rickmccawley.com

A full media portal that opens when you click the + in the news crawl, or click any AI TV Starship element. Three-section layout mirroring YouTube channel:

1. **Hero banner** — Full-width AI TV Starship key art (Rick and Brandon in astronaut uniforms), logo overlay.
2. **Three content columns** (responsive to single-column on mobile):
   - **LIVE EPISODES** — Playlist of all Thursday night 2-hour shows. YouTube-style grid with thumbnails, titles, episode numbers, dates.
   - **FULL EPISODES** — All permanent posted episodes (same content, presented as archive). Sorted newest-first.
   - **MISSION TOOLS** — All tool-specific episodes. Thumbnails, tool names, episode numbers.
3. **Each section** has a "VIEW ALL" or "+" button that expands to show all episodes from that playlist.

---

## Brand System

### Colors (inherited from rickmccawley.com + cinematic overlay)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-space` | `#0A0A0F` | Deep space background for AI TV sections |
| `--bg-dark` | `#222222` | Standard dark gray (from hub) |
| `--headline-gold` | `#FFD700` | Titles, logo text, episode numbers |
| `--flag-blue` | `#002868` | CTA buttons, section accents |
| `--gator-orange` | `#FA4616` | LIVE/ON AIR badge, energy accents |
| `--sky-blue` | `#87CEEB` | Subtitles, metadata text |
| `--on-air-red` | `#FF2020` | Pulsing ON AIR indicator |
| `--reef-teal` | `#00D4AA` | Status dots, links |
| `--text-primary` | `#FFFFFF` | Body text |
| `--text-muted` | `#B0B0B0` | Secondary text |

### Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Section title ("AI TV STARSHIP") | Bebas Neue | 36-48px | 400 | Gold #FFD700 |
| Episode title | Bebas Neue | 20-24px | 400 | Gold #FFD700 |
| Episode number | Bebas Neue | 14-16px | 400 | Sky blue #87CEEB |
| Show time / metadata | Work Sans | 13-14px | 400 | Muted #B0B0B0 |
| Body / descriptions | Work Sans | 14-16px | 400 | White #FFFFFF |
| ON AIR badge | Bebas Neue | 12px | 400 | White on red |
| LIVE badge | Work Sans | 10px | 600 | White on teal |

### Logo Usage

- **Primary**: `000AiTvStarShip_LOGO_transparent.jpg` — 3D metallic "AITV STARSHIP" with rocket launch + star. Use on dark backgrounds only.
- **Sizing**: Min 120px wide on mobile, max 280px on desktop.
- **Placement**: Always centered in its container. Never crop the star or rocket exhaust.

---

## Hub Section Layout (3-Column)

```
┌──────────────────────────────────────────────────────────────┐
│                    AI TV STARSHIP (dark bar)                  │
├────────────────┬────────────────┬────────────────────────────┤
│  LIVE / NEXT   │ LATEST EPISODE │    MISSION TOOLS           │
│                │                │                            │
│  [AITV Logo]   │  [Thumbnail]   │    [Thumbnail]             │
│                │                │                            │
│  NEXT LIVE:    │  Episode 032   │    Mission Tools:          │
│  THU APR 10    │  "From         │    Perplexity Computer     │
│  8-10 PM ET    │   Darkness     │    Ep. MT-025              │
│                │   To Light"    │                            │
│  [WATCH LIVE]  │                │    ─────────────           │
│                │  [WATCH NOW]   │    Recent Tools:           │
│  * ON AIR *    │                │    • Perplexity Computer   │
│  (flashes      │                │    • Gemini CLI            │
│   Thu 8-10)    │                │    • Krea AI               │
│                │                │    • Grok by xAI           │
│                │                │    [ALL MISSION TOOLS →]   │
└────────────────┴────────────────┴────────────────────────────┘
```

### Mobile Layout (single column, stacked)

```
┌────────────────────────┐
│   AI TV STARSHIP       │
├────────────────────────┤
│  [AITV Logo]           │
│  NEXT LIVE: THU 8-10PM │
│  [WATCH LIVE]          │
├────────────────────────┤
│  [Latest Ep Thumbnail] │
│  Episode 032           │
│  [WATCH NOW]           │
├────────────────────────┤
│  [Mission Tools Thumb] │
│  Recent Tools: ...     │
│  [ALL MISSION TOOLS →] │
└────────────────────────┘
```

### ON AIR Logic

```javascript
// Check if current time is Thursday 8-10 PM ET
function isOnAir() {
  const now = new Date();
  const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = et.getDay(); // 4 = Thursday
  const hour = et.getHours();
  return day === 4 && hour >= 20 && hour < 22;
}
```

When ON AIR is true:
- LIVE badge pulses red (#FF2020) with glow animation
- "ON AIR" text flashes (opacity animation)
- "WATCH LIVE" button turns red with urgency styling
- Logo gets subtle glow

---

## Standalone Sub-Site Layout (aitv.rickmccawley.com)

### Page Structure

```
┌──────────────────────────────────────────────────────────────┐
│ [NEWS CRAWL — same as hub, + button goes to this site]       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│           [HERO BANNER: Rick & Brandon key art]              │
│           [AI TV STARSHIP LOGO overlay]                      │
│           "Your flight plan through the world of AI"         │
│           LIVE THURSDAYS 8-10 PM ET                          │
│           [WATCH LIVE →]                                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ LIVE SHOWS  │  │ EPISODES    │  │ MISSION     │          │
│  │             │  │             │  │ TOOLS       │          │
│  │ [thumb]     │  │ [thumb]     │  │ [thumb]     │          │
│  │ EP 032      │  │ EP 032      │  │ MT: Perp.   │          │
│  │ [thumb]     │  │ EP 031      │  │ MT: Gemini  │          │
│  │ EP 031      │  │ EP 030      │  │ MT: Krea    │          │
│  │ ...         │  │ ...         │  │ ...         │          │
│  │ [VIEW ALL]  │  │ [VIEW ALL]  │  │ [VIEW ALL]  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ [BOTTOM NAV — same as hub]                                   │
└──────────────────────────────────────────────────────────────┘
```

### YouTube Data Sources

| Content | Source | Playlist ID |
|---------|--------|-------------|
| Main channel | `youtube.com/user/rmccawle` | — |
| Channel ID | `UC27f8KE5M0MZkDAFgaTe8RQ` | — |
| Live stream | `youtube.com/user/rmccawle/live` | — |
| Mission Tools playlist | `PLp0iAwWZ6jzwuOGeglK5A7YwCDbl8WQRR` | 25 videos |
| North Star Projects | `PLp0iAwWZ6jzyOngE41pfokoKp42BmlwCs` | — |
| Interviews | `PLp0iAwWZ6jzxnu38p2pG4v2R5pUIuQpnR` | — |
| Tool Time channel | `youtube.com/@aitvstarship` | — |

### Episode Pattern

- **Full episodes**: "AITV Starship - Episode XXX - [Title]" — ~2 hours, Thursdays
- **Mission Tools**: "[Tool Name] AITV Starship Mission Tools" — 3-50 min, posted days after live show
- **Mission Tool Minis**: "AITV Starship Mission Tool Minis: [Tool Name]" — 2-3 min
- **North Star Projects**: "[Topic] | AITV Starship Northstar" — 5-7 min
- **Interviews**: "AITV Starship Interviews: [Guest Name]" — 30-60 min

### YouTube API Integration

Use YouTube Data API v3 to pull:
1. Latest video from channel (for "Latest Episode")
2. Playlist items from Mission Tools playlist (for scrollable tool list)
3. Channel live status (for ON AIR detection, or use time-based fallback)

API Key will be injected at build/deploy time. Fallback: static data updated weekly.

---

## Design Rules

### Tile Thumbnails (YouTube-style)

- 16:9 aspect ratio
- Rounded corners: 8px
- Hover: scale 1.03, subtle gold border glow
- Title overlay: bottom gradient from transparent to near-black, title in white
- Episode number: top-left badge in gold
- Duration: bottom-right badge

### Dark Bar Separator

```css
.aitv-bar {
  background: #111111;
  padding: 16px 0;
  text-align: center;
  border-top: 2px solid rgba(255, 215, 0, 0.15);
  border-bottom: 2px solid rgba(255, 215, 0, 0.15);
}

.aitv-bar h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: #FFD700;
  letter-spacing: 0.1em;
}
```

### Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| Desktop (1024px+) | 3-column grid |
| Tablet (768-1023px) | 2-column (LIVE + Latest side by side, Mission Tools below) |
| Mobile (< 768px) | Single column, stacked |

---

## Implementation Notes

### For Hub Integration (rickmccawley.com)

1. Add AI TV Starship section HTML between `#bio` and `#missions` in index.html
2. Add the dark bar separator between AI TV section and Star Missions
3. Copy `000AiTvStarShip_LOGO_transparent.jpg` into project as `aitv-logo.jpg`
4. Add ON AIR time-check logic to app.js
5. YouTube embeds use privacy-enhanced mode (`youtube-nocookie.com`)

### For Standalone Sub-Site (aitv.rickmccawley.com)

1. New folder: `/home/user/workspace/aitv-starship/`
2. Shares brand CSS variables with hub
3. YouTube API integration for dynamic content
4. GitHub repo: `RickMccaw/aitv-starship`
5. GitHub Pages with CNAME: `aitv.rickmccawley.com`
6. DNS CNAME: `aitv.rickmccawley.com` → `rickmccaw.github.io`

### File Structure

```
aitv-starship/
├── index.html          # Standalone portal
├── style.css           # Styles (imports hub brand tokens)
├── app.js              # YouTube API, ON AIR logic, playlist rendering
├── aitv-logo.jpg       # Logo image
├── CNAME               # aitv.rickmccawley.com
└── design.md           # This file (copy)
```

---

## Master Design.md for All 18 Project Sub-Sites

This AI TV Starship design.md establishes the pattern for all future sub-domain sites:

1. **Brand consistency**: Every sub-site inherits the hub's CSS variables (dark gray, gold, blue, orange)
2. **News crawl**: Same ticker component, always present at top
3. **Bottom nav**: Same social/contact/support bar, always anchored
4. **Typography**: Bebas Neue for headlines, Work Sans for body
5. **Dark theme**: Near-black to dark gray backgrounds, light text
6. **Responsive**: 3→2→1 column grid, phone-first thinking
7. **Tile icons**: Future goal is full photographic images per tile (replacing current SVG line icons)
8. **GitHub Pages**: Each project gets its own repo, CNAME, and GitHub Pages deployment

---

## Current Episode Data (as of Apr 4, 2026)

| # | Title | Type | Date |
|---|-------|------|------|
| EP 032 | From Darkness To Light | Full Episode | Apr 3, 2026 |
| MT-025 | Perplexity Computer | Mission Tools | Mar 29, 2026 |
| EP 031 | Perplexity Computer Runs The Show | Full Episode | Mar 27, 2026 |
| EP 030 | A New Format | Full Episode | Mar 21, 2026 |
| EP 029 | Rick Brings The News, Brandon's On A Train | Full Episode | Mar 14, 2026 |
| EP 028 | Rick The AI Guy Is A Dangerous Man | Full Episode | Mar 7, 2026 |
| EP 027 | 30 News In 10 Days | Full Episode | Mar 7, 2026 |
| EP 026 | Thinking Different | Full Episode | Feb 2026 |

### Four Show Segments (from channel description)

1. **News** — What changed and why it matters
2. **Deep Dive** — Smart, no-fluff explainers
3. **Tool Time** — Hands-on workflows (becomes Mission Tools)
4. **North Star Missions** — Big ideas you can join

---

## Quality Bar

- Must feel like a real streaming platform, not a blog with video embeds
- Thumbnails should be crisp and match YouTube's visual quality
- ON AIR animation should feel broadcast-grade
- Scrolling tool list should feel like Netflix category browsing
- Every click leads to YouTube — we drive views, not host video
