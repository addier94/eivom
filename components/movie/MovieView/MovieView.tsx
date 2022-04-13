import {GetMoviesType} from '@type/themovie/moviesType';
import React, {useEffect, useState} from 'react';
import {getData} from '../../../utils/api-data';
import MovieItem from '../MovieItem';
import s from './MovieView.module.css';

const MovieView = () => {
  const [movies, setMovies] = useState<GetMoviesType>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getData(`/movie/popular?page=${currentPage}`)
        .then(({data}) => setMovies(data));
  }, []);
  return (
    <div className={s.root}>
      {
        movies && movies.results.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))
      }
    </div>
  );
};

export default MovieView;
