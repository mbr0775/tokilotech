# Hero liquid-metal video

Source: the existing repository asset `public/media/hero-liquid-metal.mp4`. No new third-party footage was added.

Web version: `public/media/hero-liquid-metal-parallax.mp4`.

The full 29.4-second source was re-encoded with FFmpeg using H.264, CRF 29, 24 fps, 1280 × 720, YUV 4:2:0, no audio and MP4 fast-start metadata. The original source and existing poster are retained. Playback is decorative, muted and inline; reduced-motion, pause, offscreen and hidden-tab behavior is handled by the hero component.

```sh
ffmpeg -i public/media/hero-liquid-metal.mp4 -an -vf fps=24 -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -movflags +faststart public/media/hero-liquid-metal-parallax.mp4
```
