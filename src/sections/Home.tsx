import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import profile from "../assets/images/profile.jpg";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setMounted(true);
      return;
    }

    // Run on next animation frame so initial styles are applied,
    // then animate in — looks smoother.
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col gap-8 sm:grid sm:grid-cols-9 sm:gap-8 bg-accent scroll-section container mx-auto px-4 py-14"
      >
        <div
          className={cn(
            "lg:col-span-4 col-span-1 bg-transparent py-10",
            "transform transition-all duration-700 ease-out will-change-transform",
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          )}
        >
          {" "}
          <h1 className="text-3xl font-bold mb-4">
            Hi, I'm Your Nischal Shrestha
          </h1>
          <p className="text-neutral/80">
            I am a software engineer with focus on front-end development.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-200 rounded">JavaScript</span>
            <span className="px-3 py-1 bg-gray-200 rounded">React</span>
            <span className="px-3 py-1 bg-gray-200 rounded">Express</span>
          </div>
        </div>
        <div
          className={cn(
            "lg:col-start-6 lg:col-end-10 col-span-1 flex items-center justify-center py-10",
            "transform transition-all duration-700 ease-out will-change-transform",
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
          )}
        >
          {" "}
          <div className="relative h-80 lg:h-96 flex justify-center items-center">
            <div className="absolute inset-0 bg-orange-500 -skew-y-12 rounded-xl lg:rounded-[2rem]"></div>

            <img
              src={profile}
              alt="prfile"
              className="relative w-64 h-64 lg:w-72 lg:h-72 object-cover rounded-xl lg:rounded-[2rem] shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
