"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import { useAboutMotion } from "./AboutMotion";
import styles from "./AboutHeadline.module.css";

const lines = [
  { text: "Technology", alignment: "start" },
  { text: "should make", alignment: "end" },
  { text: "growth feel simpler.", alignment: "spread", accent: true },
] as const;
const heading = lines.map((line) => line.text).join(" ");

/** The complete heading is rendered on the server; motion enhances its visible letters. */
export default function AboutHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { paused } = useAboutMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let entryObserver: IntersectionObserver | undefined;
    let exitObserver: IntersectionObserver | undefined;
    let completion: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;

    const clearCompletion = () => {
      if (completion) clearTimeout(completion);
      completion = undefined;
    };
    const finish = () => {
      clearCompletion();
      element.dataset.textState = "complete";
    };
    const arm = () => {
      clearCompletion();
      element.dataset.textState = "waiting";
    };
    const reveal = () => {
      clearCompletion();
      element.dataset.textState = "revealing";
      completion = setTimeout(finish, 1900);
    };

    const measure = () => {
      // offsetLeft/offsetWidth describe the final layout, unaffected by transforms.
      const desktop = window.matchMedia("(min-width: 851px)").matches;
      element
        .querySelectorAll<HTMLElement>("[data-headline-line]")
        .forEach((line) => {
          const words = Array.from(
            line.querySelectorAll<HTMLElement>("[data-headline-word]"),
          );
          const gap = parseFloat(getComputedStyle(line).columnGap) || 0;
          const packedWidth =
            words.reduce((width, word) => width + word.offsetWidth, 0) +
            gap * Math.max(0, words.length - 1);
          let packedLeft = (line.offsetWidth - packedWidth) / 2;
          words.forEach((word) => {
            word.style.setProperty(
              "--word-shift",
              `${desktop ? packedLeft - word.offsetLeft : 0}px`,
            );
            packedLeft += word.offsetWidth + gap;
          });
        });
    };

    const start = () => {
      entryObserver?.disconnect();
      exitObserver?.disconnect();
      measure();
      const enabled =
        !paused &&
        !preference.matches &&
        typeof IntersectionObserver !== "undefined";
      element.dataset.textEnabled = String(enabled);
      if (!enabled) {
        finish();
        return;
      }

      const bounds = element.getBoundingClientRect();
      // Never hide a heading that is already being read, including restored scroll positions.
      if (bounds.top >= innerHeight || bounds.bottom < -120) arm();
      else finish();

      entryObserver = new IntersectionObserver(
        (entries) => {
          if (
            entries.some((entry) => entry.isIntersecting) &&
            element.dataset.textState === "waiting"
          )
            reveal();
        },
        { rootMargin: "0px 0px -24% 0px", threshold: 0 },
      );
      exitObserver = new IntersectionObserver(
        (entries) => {
          if (
            entries.every((entry) => !entry.isIntersecting) &&
            !element.contains(document.activeElement)
          )
            arm();
        },
        { rootMargin: "120px", threshold: 0 },
      );
      // Observe the stable heading box, never the moving letter/word layers.
      entryObserver.observe(element);
      exitObserver.observe(element);
    };

    let previousWidth = element.offsetWidth;
    const resizeObserver = new ResizeObserver(() => {
      if (previousWidth !== element.offsetWidth) {
        previousWidth = element.offsetWidth;
        if (element.dataset.textState === "revealing") finish();
      }
      measure();
    });
    const onVisibility = () => {
      if (document.hidden) finish();
      else start();
    };
    start();
    resizeObserver.observe(element);
    void document.fonts.ready.then(() => {
      if (!disposed) measure();
    });
    preference.addEventListener("change", start);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      clearCompletion();
      entryObserver?.disconnect();
      exitObserver?.disconnect();
      resizeObserver.disconnect();
      preference.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", onVisibility);
      delete element.dataset.textEnabled;
      delete element.dataset.textState;
    };
  }, [paused]);

  let characterIndex = 0;
  return (
    <h2
      ref={ref}
      id="about-heading"
      className={styles.headline}
      aria-label={heading}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={line.text}>
          <span
            aria-hidden="true"
            data-headline-line
            data-alignment={line.alignment}
            className={`${styles.line} ${"accent" in line ? styles.accent : ""}`}
            style={{ "--line-order": lineIndex } as CSSProperties}
          >
            {line.text.split(" ").map((word, wordIndex) => (
              <Fragment key={word}>
                {wordIndex > 0 && " "}
                <span className={styles.word} data-headline-word>
                  {Array.from(word).map((character) => {
                    const index = characterIndex++;
                    return (
                      <span
                        key={index}
                        className={styles.character}
                        style={{ "--char-order": index } as CSSProperties}
                      >
                        {character}
                      </span>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </span>
          {lineIndex < lines.length - 1 && " "}
        </Fragment>
      ))}
    </h2>
  );
}
