import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-700 text-white py-10 px-6 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Brand / Name */}
        <div>
          <h2 className="text-2xl font-bold">Nischal Shrestha</h2>
          <p className="text-sm text-gray-300 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Middle: Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <a href="#home" className="hover:text-orange-400 transition">
            Home
          </a>
          <a href="#about" className="hover:text-orange-400 transition">
            About
          </a>
          <a href="#projects" className="hover:text-orange-400 transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-orange-400 transition">
            Contact
          </a>
        </div>

        {/* Right: Socials */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Nischll"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/nischal-shrestha-career"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition"
            >
              Linkedin
            </a>
            {/* <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition"
            >
              Twitter
            </a> */}
          </div>
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
