import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosHttpClient from '../../libs/axios/AxiosHttpClient';
import { useState, useEffect } from 'react';
import PageMovie from '../../Entity/PageMovie';
import Carousel from './carousel';

export default function HomePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const language = useSelector(state => state.language);

  const [data, setData] = useState(new PageMovie());

  useEffect(() => {
    axiosHttpClient.get("/3/discover/movie").then(data=>setData(new PageMovie(data)));
  }, []);

  return (
    <div>
      <div>{theme.selectedTheme}</div>
      <div>{language.selectedLanguage}</div>
      {data?
        <Carousel movieList={data.results}/> : <></>
      }
      {data?.results?.map((movie, index)=><div key={index}>{movie.title}</div>)}
    </div>
  );
}