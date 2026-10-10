# Homepage motion

The homepage uses the existing `framer-motion` dependency. UI UX Pro Max was consulted for reduced-motion, restrained animation, and Next.js client-boundary guidance; it is a design skill, not a browser runtime dependency.

- `app/motion/MotionSurface.tsx`: reusable article/div with a one-time 24px entrance, stagger capped at 200ms, and spring-driven pointer tilt capped at 3.5 degrees per axis. Used by project, service, team, and portrait cards.
- `app/motion/ScrollExperience.tsx`: shared MotionConfig and spring-smoothed page progress, alongside the existing section reveals and image parallax.
- `app/homescreen/homescreen.tsx`: slide entrances, CTA hover/press feedback, and focus-aware playback. Existing hero parallax remains in `use-hero-parallax.ts`.

The 3D effect uses CSS perspective and rotation, without a WebGL scene. Tilt requires a mouse, hover support, and a viewport wider than 850px. Reduced-motion preferences disable tilt and entrances; content is visible in server-rendered HTML. Focus inside a card immediately reveals it and returns its tilt to neutral. The hero suspends playback while focus is inside it.

Use MotionSurface directly as the grid item to preserve grid spans, ordering, and semantic markup. Do not add `data-scroll-reveal` to it: its entrance is already controlled by Framer Motion.

Manual review: check desktop hover/exit, keyboard navigation, service/project filtering, touch scrolling, and toggling reduced motion during an animation. Check 375px, 768px, 1024px, and 1440px widths in both themes.

## Animate UI

`components.json` configures shadcn's Animate UI registry for this existing Tailwind v4 project. Add individual components with npm:

```sh
npx shadcn@latest add @animate-ui/primitives-texts-sliding-number
```

The hero uses `SlidingNumber` from `@/components/animate-ui/primitives/texts/sliding-number`. Its rolling digits are hidden from screen readers; a separate text label reports the current slide. Reduced motion renders a plain number. A literal leading zero preserves the two-digit counter because the primitive's `padStart` option pads to the target number's length, not a specified width.

The existing theme is retained. Components added later that depend on shadcn color tokens may require additional theme mappings in `app/globals.css`.

References:
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- https://motion.dev/docs/react-animation
- https://motion.dev/docs/react-use-spring
- https://animate-ui.com/docs/installation
- https://animate-ui.com/docs/primitives/texts/sliding-number
