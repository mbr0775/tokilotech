# Tokilo video backgrounds and concept films

The owner created and supplied five videos in `public/`. The website uses smaller playback copies in `public/media/videos/` and JPEG frames in `public/media/videos/posters/`. Original exports remain unchanged.

- `tokilo-ambient-tech.mp4`: the default full-page background on every public page, including the hero and unmarked sections. Playback copy: 960 × 540, 8 seconds, 1,088,845 bytes (original: 7,306,711 bytes).
- `tokilo-connected-products.mp4`: the default film below the homepage, About, Services, Projects and Contact heroes. Playback copy: 1280 × 720, 8 seconds, 1,627,726 bytes.
- `tokilo-ai-network.mp4`: Practical AI film and the background behind About and Services. Playback copy: 1280 × 720, approximately 10 seconds, 1,777,768 bytes.
- `tokilo-digital-engineering.mp4`: Digital engineering film and the background behind the build process. Playback copy: 1280 × 720, 8 seconds, 1,302,565 bytes.
- `tokilo-growth-ribbon.mp4`: Built for growth film and the background behind team, contact, consultation and footer sections. Playback copy: 1280 × 720, approximately 10 seconds, 1,463,723 bytes.

Playback copies use H.264, yuv420p, 24 fps and fast-start MP4. Audio was removed. Encoded with FFmpeg/libx264, medium preset, CRF 25 with a 1000k maximum bitrate for the ambient clip; CRF 23 with a 2000k maximum bitrate for the four showcase clips. Posters are extracted at 0.7 seconds.

One full-page background and the current showcase film are mounted. The background changes when the corresponding section crosses the middle of the viewport, with a gentle fade and the same behavior while scrolling back. The four showcase films play automatically in order after each clip finishes, then repeat. Tabs still allow direct selection; while a selector has focus its current film loops so keyboard interaction is not interrupted. Pausing stops playback and automatic advancement. Offscreen and hidden-tab films pause. Background clips loop independently.

Reduced motion and JavaScript-disabled views retain the ambient still background and all essential server-rendered content. A navigation background control and a separate showcase control support keyboard use; the four film selectors also support Left/Right, Home and End keys. Policy, account and error pages keep their primary content easy to reach above the shared background.

Concept films are decorative illustrations, not screenshots of client work. They do not imply client results or endorsements. Earlier Pexels background footage has been replaced by these owner-provided assets.
