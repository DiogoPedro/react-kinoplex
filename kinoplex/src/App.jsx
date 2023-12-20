import { lazy, Suspense, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import axiosHttpClient from './libs/axios/AxiosHttpClient';
import PageMovie from './Entity/PageMovie';
import { setMovies } from './store/features/movieSlice';

import LoadingPage from "./pages/LoadingPage";
const HomePage = lazy(() => import('./pages/HomePage'));

import pageMovieTest from './constants/pageMovieTest.json';

function Router() {

  const dispatch = useDispatch();
  const language = useSelector(state => state.language);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [fetchingMovies, setFetchingMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    setFetchingMovies([]);
    for(let page=1; page<=10; page++){

      const query = "?language="+language.selectedLanguage+"&page="+page;
      /*
      axiosHttpClient.get("/3/discover/movie"+query).then(data=>{
        setFetchingMovies(prev=>[...prev, ...(new PageMovie(data)).results]);
        setProgress(prev=>prev+10);
      });
      */
      setFetchingMovies(prev=>[...prev, ...(new PageMovie(pageMovieTest)).results]);
      setProgress(prev=>prev+10);
    }
  }, [language.selectedLanguage]);

  useEffect(()=>{
    if(fetchingMovies.length===200){
      dispatch(setMovies(fetchingMovies));
    }
  }, [fetchingMovies]);

  useEffect(()=>{
    console.log(progress);
    if(progress>=100)
      setTimeout(()=>setLoading(false), 200);
  }, [progress]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={
        createBrowserRouter([
          {
            path: "/",
            element: <HomePage loadingMovies={loading} loadingMoviesProgress={progress}/>,
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