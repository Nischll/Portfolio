import { lazy } from "react";

const Navbar = lazy(() => import("../layout/Navbar"));
const Home = lazy(() => import("../../sections/Home"));
const About = lazy(() => import("../../sections/About"));
const Projects = lazy(() => import("../../sections/Projects"));
const Contact = lazy(() => import("../../sections/Contact"));
const Footer = lazy(() => import("../layout/Footer"));

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
