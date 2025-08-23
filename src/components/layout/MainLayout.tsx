import { lazy } from "react";

const Navbar = lazy(() => import("../layout/Navbar"));
const Home = lazy(() => import("../../sections/Home"));
const Projects = lazy(() => import("../../sections/Projects"));
const Contact = lazy(() => import("../../sections/Contact"));
const Footer = lazy(() => import("../layout/Footer"));

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
