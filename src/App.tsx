import { lazy } from "react";

const MainLayout = lazy(() => import("../src/components/layout/MainLayout"));

function App() {
  return (
    <>
      {/* <Suspense fallback={<Loader label="loading..." />}>
        <RouterProvider router={router} />
      </Suspense> */}
      <MainLayout />
    </>
  );
}

export default App;
