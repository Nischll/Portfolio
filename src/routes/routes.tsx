// import { lazy } from "react";
// import { Navigate, type RouteObject } from "react-router-dom";

// const MainLayout = lazy(() => import("../components/layout/MainLayout"));
// const Home = lazy(() => import("../sections/Home"));
// const About = lazy(() => import("../sections/Contact"));
// const Projects = lazy(() => import("../sections/Projects"));
// const ErrorPage = lazy(() => import("../sections/ErrorPage"));

// export const routes: RouteObject[] = [
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <div>Error</div>,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "projects",
//         element: <Projects />,
//       },
//     ],
//   },
//   {
//     path: "/unauthorized",
//     element: <ErrorPage />,
//   },
//   {
//     path: "*",
//     element: <Navigate to="/unauthorized" replace />,
//   },
// ];
