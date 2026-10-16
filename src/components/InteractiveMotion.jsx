
import { useEffect } from "react";
import "../animations/interactive-motion.css";

const REVEAL_SELECTORS = [
  ".section-heading",
  ".product-card",
  ".shop-grid > *",
  ".manifesto-copy",
  ".manifesto-image",
  ".ritual-copy",
  ".ritual-collage",
  ".story-values > *",
  ".story-quote",
  ".story-cta",
  ".journal-card",
  ".journal-note",
  ".contact-intro",
  ".contact-details > *",
  ".contact-form",
  ".cart-item",
  ".cart-summary",
  ".page-intro",
  ".shop-toolbar",
  ".newsletter-inner",
  ".footer-top > *",
  ".empty-cart",
  ".detail-info",
  ".detail-image",
];

const INTERACTIVE_SELECTORS = [
  ".product-card",
  ".journal-card",
  ".product-image-wrap",
  ".journal-image",
];

export default function InteractiveMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return undefined;

    let observer;

    const setupElements = () => {
      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("motion-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px",
          }
        );
      }

      document.querySelectorAll(REVEAL_SELECTORS.join(",")).forEach((el) => {
        if (
          el.closest(".hero-art-cup") ||
          el.classList.contains("motion-ready")
        ) {
          return;
        }

        el.classList.add("motion-ready");
        observer.observe(el);
      });

      document.querySelectorAll(INTERACTIVE_SELECTORS.join(",")).forEach(
        (el) => {
          if (el.classList.contains("motion-interactive")) return;

          el.classList.add("motion-interactive");
        }
      );
    };

    setupElements();

    // Also enhance elements rendered after React Router navigation.
    const mutationObserver = new MutationObserver(() => {
      setupElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
}
