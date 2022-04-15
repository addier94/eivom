import {GetMoviesType} from '@type/themovie/moviesType';
import React, {useEffect, useState} from 'react';
import {getData} from '../../../utils/api-data';
import MovieItem from '../MovieItem';
import s from './MovieView.module.css';
import Pagination from '../../common/Pagination/Pagination';
import {useRouter} from 'next/router';

const MovieView = () => {
  const [movies, setMovies] = useState<GetMoviesType>();
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);

  const router = useRouter();

  const changePage = (page:number) => {
    router.query.page = `${page}`;
    router.push(router);
    setCurrentPage(page);
  };

  const fetchMovies = () => {
    getData(`/movie/popular?page=${currentPage}`)
        .then(({data}) => setMovies(data))
        .catch((e) => console.log('first'));
  };

  useEffect(() => {
    const pag = Number(router.asPath.match(/[0-9]/g)?.join(''));

    pag ? setCurrentPage(pag) : setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (currentPage) fetchMovies();
  }, [currentPage]);


  return (
    <>
      <div className={s.root}>
        {
          movies && movies.results.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))
        }
      </div>
      <Pagination
        callback={changePage}
        currentPage={currentPage} />
    </>
  );
};

export default MovieView;
