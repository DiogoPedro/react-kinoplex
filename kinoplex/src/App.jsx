import { lazy, Suspense, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
const HomePage = lazy(() => import('./pages/HomePage'));

function Router() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={
        createBrowserRouter([
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/403",
            element: <>Você não tem permissão pra acessar essa página</>,
          },
          {
            path: "*",
            element: <>Página não encontrada</>,
          }
        ])
      } />
    </Suspense>
  );
}

export default Router;