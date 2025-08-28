import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, type SectionId } from "../../data/nav";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [hash, setHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openMenu) {
        setOpenMenu(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  // focus the close button when menu opens
  useEffect(() => {
    if (openMenu) {
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
  }, [openMenu]);

  // scroll to hash on initial mount (keeps your behavior)
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const navHString = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--nav-h");
    const navH = navHString ? parseInt(navHString, 10) || 0 : 0;

    const callback: IntersectionObserverCallback = (entries) => {
      // try to find intersecting entries first
      const intersecting = entries.filter((e) => e.isIntersecting);
      let chosenId: string | undefined;

      if (intersecting.length) {
        // pick the entry with the largest intersectionRatio
        chosenId = intersecting.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0].target.id;
      } else {
        // fallback: no entries are intersecting (can happen near edges) —
        // choose section whose top is closest to nav bottom (navH)
        const distances: { id: string; distance: number }[] = [];
        NAV_ITEMS.forEach((item) => {
          const el = document.getElementById(item.id);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // distance from the nav bottom (so 0 means exactly below nav)
          distances.push({ id: item.id, distance: Math.abs(rect.top - navH) });
        });
        if (distances.length) {
          distances.sort((a, b) => a.distance - b.distance);
          chosenId = distances[0].id;
        }
      }

      if (chosenId) {
        const newHash = `#${chosenId}`;
        // only replace if it actually differs from current location hash
        if (newHash !== window.location.hash) {
          window.history.replaceState(null, "", newHash);
        }
        // always update state so UI reflects the chosen section
        setHash(newHash);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      // keep rootMargin so sticky nav is accounted for — tune the bottom as needed
      rootMargin: `-${navH}px 0px -40% 0px`,
      threshold: [0.25, 0.5, 0.75],
    });

    const observedEls: Element[] = [];
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
        observedEls.push(el);
      }
    });

    // extra safety: if user is at very top, force #home quickly
    const topCheck = () => {
      if (window.scrollY <= navH + 5) {
        const homeHash = "#home";
        if (homeHash !== window.location.hash) {
          window.history.replaceState(null, "", homeHash);
        }
        setHash(homeHash);
      }
    };

    window.addEventListener("scroll", topCheck, { passive: true });

    return () => {
      observedEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener("scroll", topCheck);
    };
  }, []);

  const current = (hash?.replace("#", "") || "home") as SectionId;

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/90 backdrop-blur"
        style={{ height: "var(--nav-h)" }}
      >
        <nav className="container mx-auto h-full flex items-center justify-between px-4">
          <button
            ref={menuBtnRef}
            className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-neutral hover:bg-neutral/6"
            aria-label="Toggle menu"
            aria-expanded={openMenu}
            aria-controls="mobile-menu"
            onClick={() => setOpenMenu((s) => !s)}
          >
            {!openMenu ? <Menu /> : <X />}
          </button>

          <span className="font-semibold">Nischal Shrestha</span>

          <ul className="hidden sm:flex items-center gap-16">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current === item.id ? "true" : undefined}
                  className={cn(
                    "nav-link transition-colors hover:text-neutral",
                    current === item.id
                      ? "text-neutral active"
                      : "text-neutral/60"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span>
            <a
              href="https://www.linkedin.com/in/nischal-shrestha-career"
              title="Connect with me on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-transparent text-neutral hover:bg-[#eaf3ff]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5v15H0v-15zM8.5 8.98h4.8v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66v8.89h-5V16.6c0-2.47-.04-5.64-3.44-5.64-3.44 0-3.97 2.68-3.97 5.44v8.21h-5v-15z" />
              </svg>
            </a>
          </span>
        </nav>
      </header>

      {/*  Mobile view */}
      {openMenu && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 z-50 backdrop-blur-[2px]"
            onClick={() => {
              setOpenMenu(false);
              menuBtnRef.current?.focus();
            }}
            aria-hidden="true"
          />

          <div className="absolute">
            {openMenu && (
              <div
                role="dialog"
                id="mobile-menu"
                className="fixed left-0 right-0 bottom-0 z-50 mx-auto w-full max-w-xl bg-white rounded-t-xl shadow-xl overflow-hidden transform transition-transform duration-300 "
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-semibold">Menu</span>
                  <button
                    ref={closeBtnRef}
                    onClick={() => {
                      setOpenMenu(false);
                      menuBtnRef.current?.focus();
                    }}
                    aria-label="Close menu"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-md"
                  >
                    <X />
                  </button>
                </div>
                <nav className="p-4">
                  <ul className="flex flex-col gap-3">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(false);
                            const section = document.getElementById(item.id);
                            if (section) {
                              section.scrollIntoView({ behavior: "smooth" });
                            }
                            window.history.pushState(null, "", `#${item.id}`);
                            setHash(`#${item.id}`);
                          }}
                          className={cn(
                            "w-full text-left py-3 px-2 text-lg font-medium rounded-md transition-colors",
                            current === item.id
                              ? "text-neutral bg-neutral/5"
                              : "text-neutral/80 hover:bg-neutral/3"
                          )}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
