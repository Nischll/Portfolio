import { lazy, Suspense } from "react";
import Loader from "./components/ui/loader";

const MainLayout = lazy(() => import("../src/components/layout/MainLayout"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader label="loading..." />}>
        {/* <RouterProvider router={router} /> */}
        <MainLayout />
      </Suspense>
    </>
  );
}

export default App;
