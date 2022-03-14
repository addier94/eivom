import {Layout} from '@components/common';
import {MovieView} from '@components/Movie';
import {GetMoviesType} from '@type/themovie/moviesType';
import useFetch from 'hooks/useMovies';


const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=9cc1713d255e5c5d385dad53835c3edf&language=en-US&page=1`;


export default function Home() {
  const {data, error} = useFetch<GetMoviesType>(url);

  return (
    <>

      { data && <MovieView NowPlaying={data} /> }
    </>
  );
}

Home.Layout = Layout;
