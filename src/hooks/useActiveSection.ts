import * as React from "react";
import type { SectionId } from "../data/nav";

export function useActiveSection(sectionIds: SectionId[]) {
  const [active, setActive] = React.useState<SectionId>("home");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id as SectionId);
      },
      {
        root: null,
        rootMargin: `- ${getComputedStyle(document.documentElement)
          .getPropertyValue("--nav-h")
          .trim()} 0px 0px 0px`,
        threshold: [0.25, 0.6, 0.8],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
