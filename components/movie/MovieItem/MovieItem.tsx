import {Star} from '@components/icons';
import {ResultMovies} from '@type/themovie/moviesType';
import {PATH_IMAGE} from 'api/eivom';
import Image from 'next/image';
import React from 'react';
import {getReleaseDate} from 'utils/format-date';
import s from './MovieItem.module.css';

interface Props {
  movie: ResultMovies
}
const MovieItem = ({movie}:Props) => {
  return (
    <div className={s.cardBlock}>
      <article className='absolute z-20 w-full h-full text-sm'>
        <section className='bg-primary py-1 px-2 inline-block'>
          <div className='align-sub tracking-tighter text-primary'>{movie.vote_average}
            <Star className="text-yellow-500 w-4 h-4 mb-1 inline-block" />
            <span className='text-violet'>{movie.vote_count}</span>
          </div>
        </section><br/>

        <div className='bg-primary inline-block px-2 py-1'>
          {getReleaseDate(movie.release_date)}
        </div>
      </article>
      <Image
        src={`${PATH_IMAGE}/${movie.poster_path}`}
        width={380}
        height={580}
        quality="85"
        layout='responsive'
      />
    </div>
  );
};

export default MovieItem;
