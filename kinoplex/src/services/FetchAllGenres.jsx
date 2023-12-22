import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../store/features/movieSlice';
import axiosHttpClient from '../libs/axios/AxiosHttpClient';

export default function FetchAllGenresService() {

  const dispatch = useDispatch();
  const language = useSelector(state => state.language);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);

    const query = "?language="+language.selectedLanguage;
    axiosHttpClient.get("3/genre/movie/list"+query)
      .then(data=>{
        dispatch(setGenres(data.genres));
        setLoading(false);
        setLoaded(true);
      })
      .catch(error=>{
        setError(true);
        console.error(error);
      });

  }, [language.selectedLanguage]);

  return { loading, error, loaded };

}