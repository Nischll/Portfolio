import { useEffect, useState } from "react";
import { NAV_ITEMS, type SectionId } from "../../data/nav";
import { cn } from "../../lib/utils";

const Navbar = () => {
  const [hash, setHash] = useState<string>(window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const current = (hash?.replace("#", "") || "home") as SectionId;
  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b"
        style={{ height: "var(--nav-h)" }}
      >
        <nav className="container mx-auto h-full flex items-center justify-between px-4">
          <span className="font-semibold">Nischal Shrestha</span>
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-neutral",
                    current === item.id ? "text-neutral" : "text-neutral/60"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
