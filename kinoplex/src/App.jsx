import { lazy, Suspense, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import axiosHttpClient from './libs/axios/AxiosHttpClient';
import { setMovies, setGenres } from './store/features/movieSlice';

import FetchAllMoviesService from './services/FetchAllMovies';
import FetchAllGenresService from './services/FetchAllGenres';

import LoadingPage from "./pages/LoadingPage";
const HomePage = lazy(() => import('./pages/HomePage'));


function Router() {

  const fetchAllMoviesService = FetchAllMoviesService();
  const fetchAllGenresService = FetchAllGenresService();
  
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={
        createBrowserRouter([
          {
            path: "/",
            element: <HomePage loadingMovies={fetchAllMoviesService.loading} error={fetchAllMoviesService.error}/>,
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