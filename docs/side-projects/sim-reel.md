# Sailing Sim loops — shot list and encode settings

The `sim-reel` chat widget (`src/chat/widgets/SimReel.tsx`) plays short silent loops from
[Sailing Sim](https://github.com/benwmax/sailing-sim). It stays hidden until a clip in
`src/content/sim-reel.ts` has an `mp4`, a `poster`, and `alt`. Started 2026-10-30; see
decisions.md.

## The five loops

Each loop shows one idea. 6–10 seconds, cut so the last frame flows into the first.

| id | Shot | How to get it in the sim |
|---|---|---|
| `wireframe` | The J/22 turning on the gallery stage, wiping from Wireframe to Lit+Wire to Lit, studio light warming to golden hour | Gallery stage (`EGalleryView`, `EGalleryLight`), slow orbit |
| `fleet` | All eight boats in matched framing, about 1 s each | Same camera and light per boat; gallery whole-boat view or a chase camera |
| `physics` | A tack or the Hobie flying a hull, with heel, speed, and wind shown | Capture mode `Chase` or `Drone`; overlay drawn from that run's `<shot>.telemetry.csv`, not a faked HUD |
| `storm` | The gust front crossing the water, whitecaps, then rain and lightning | Weather: thunderstorm, fixed seed; time-lapse the ~9 min storm into the loop |
| `night` | Galveston ship channel at night, buoys flashing their charted characters, a tanker passing | Area: Galveston Bay, after sunset, traffic busy; `ShoreTele` or `Drone` |

## Capture

- Record the run, then render it offline in Movie Render Queue on the 4090 PC (4K, temporal
  samples for motion blur and anti-aliasing). Check first that the sim's physics, water, and
  weather step correctly at MRQ's fixed frame rate.
- Reel look, the opposite of capture mode's reference settings: motion blur and depth of field
  on, `T_CinematicLUT`, `MI_World_Trailer`.
- Set `render` in `sim-reel.ts` honestly: `offline` for MRQ, `real-time` for a live capture.
- No YouTube reference clips in anything public. Ben's own photos, or credited Commons stills.
  Ask Bean before any of Bean's motion-capture footage appears.

## Encode for the web

Master at 4K, then export 1280×720 (sharp enough at the widget's size, and small). No audio
track. `+faststart` so playback starts before the whole file arrives.

```bash
ffmpeg -i master.mov -vf "scale=1280:-2,fps=30" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart public/sim/wireframe.mp4
```

```bash
ffmpeg -i master.mov -vf "scale=1280:-2,fps=30" -an -c:v libvpx-vp9 -crf 36 -b:v 0 public/sim/wireframe.webm
```

```bash
ffmpeg -i public/sim/wireframe.mp4 -frames:v 1 -q:v 3 public/sim/wireframe.jpg
```

Aim for 2–5 MB per MP4. Then fill in the entry: `mp4`, `webm`, `poster`, a caption (one
sentence, what to notice), and `alt` (what the clip shows). When the first clip lands, add
`sim-reel` to the WIDGETS list in `api/lib/system-prompt.ts`.
