import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../store/features/movieSlice';
import axiosHttpClient from '../libs/axios/AxiosHttpClient';

export default function FetchAllMoviesService() {

  const dispatch = useDispatch();
  const language = useSelector(state => state.language);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    setAllMovies([]);

    for (let page = 1; page <= 10; page++) {
      const query = "?language=" + language.selectedLanguage + "&page=" + page;
      axiosHttpClient.get("/3/discover/movie" + query)
        .then(data => {
          setAllMovies(prev => [...prev, ...data.results]);
        })
        .catch(error => {
          setError(true);
          console.error(error);
        });
    }

  }, [language.selectedLanguage]);

  useEffect(() => {
    if (allMovies.length >= 200) {
      dispatch(setMovies(allMovies.slice(0, 200)));
      setLoading(false);
      setLoaded(true);
    }
  }, [allMovies]);

  return { loading, error, loaded };
}