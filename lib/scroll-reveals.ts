const REVEAL_SELECTOR = "[data-scroll-reveal]";

/** Enhance existing markup, leaving server-rendered content visible without JS. */
export function setupScrollReveals(root: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = new Set<HTMLElement>();
  let observer: IntersectionObserver | undefined;
  let exitObserver: IntersectionObserver | undefined;

  const show = (element: HTMLElement, immediately = false) => {
    element.dataset.scrollState = immediately ? "complete" : "visible";
  };

  const register = (element: HTMLElement, addedLater = false) => {
    if (targets.has(element)) return;
    targets.add(element);

    const bounds = element.getBoundingClientRect();
    // Restored scroll positions and the initial viewport never flash or disappear.
    if (
      preference.matches ||
      bounds.bottom <= 0 ||
      (!addedLater && bounds.top < window.innerHeight * 0.92)
    ) {
      show(element, true);
    } else {
      element.dataset.scrollState = "waiting";
    }

    observer?.observe(element);
    exitObserver?.observe(element);
  };

  const visit = (node: Element, addedLater = false) => {
    if (node instanceof HTMLElement && node.matches(REVEAL_SELECTOR)) {
      register(node, addedLater);
    }
    node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
      register(element, addedLater);
    });
  };

  const startObserver = () => {
    observer?.disconnect();
    exitObserver?.disconnect();
    observer = undefined;
    exitObserver = undefined;
    if (preference.matches) {
      targets.forEach((element) => show(element, true));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting && element.dataset.scrollState === "waiting") {
            show(element);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    // Re-arm only after the whole animated element is well outside the viewport.
    // The buffer prevents transforms at the entry edge from toggling visibility.
    exitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting && !element.contains(document.activeElement)) {
            element.dataset.scrollState = "waiting";
          }
        });
      },
      { threshold: 0, rootMargin: "120px" }
    );
    targets.forEach((element) => {
      observer?.observe(element);
      exitObserver?.observe(element);
    });
  };

  startObserver();
  visit(root);

  // Projects arrive asynchronously, and filtering can mount new cards.
  const mutations = new MutationObserver((records) => {
    records.forEach((record) => {
      record.removedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        targets.forEach((element) => {
          if (element === node || node.contains(element)) {
            observer?.unobserve(element);
            exitObserver?.unobserve(element);
            targets.delete(element);
          }
        });
      });
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) visit(node, true);
      });
    });
  });
  mutations.observe(root, { childList: true, subtree: true });

  const onFocus = (event: FocusEvent) => {
    let element = event.target instanceof Element ? event.target : null;
    while (element && element !== root) {
      if (element instanceof HTMLElement && element.matches(REVEAL_SELECTOR)) {
        show(element, true);
      }
      element = element.parentElement;
    }
  };
  const onTransitionEnd = (event: TransitionEvent) => {
    if (
      event.propertyName === "transform" &&
      event.target instanceof HTMLElement &&
      event.target.dataset.scrollState === "visible"
    ) {
      // Release temporary animation/compositor styles when the entrance finishes.
      event.target.dataset.scrollState = "complete";
    }
  };

  preference.addEventListener("change", startObserver);
  root.addEventListener("focusin", onFocus);
  root.addEventListener("transitionend", onTransitionEnd);

  return () => {
    observer?.disconnect();
    exitObserver?.disconnect();
    mutations.disconnect();
    preference.removeEventListener("change", startObserver);
    root.removeEventListener("focusin", onFocus);
    root.removeEventListener("transitionend", onTransitionEnd);
    targets.forEach((element) => delete element.dataset.scrollState);
  };
}
