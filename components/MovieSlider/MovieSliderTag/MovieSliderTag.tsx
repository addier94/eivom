import Rating from '@components/ui/Rating';
import {ResultMovies} from '@type/themovie/moviesType';
import cn from 'clsx';
import {getReleaseDate} from 'utils/format-date';
// import {inherits} from 'util';
import s from './MovieSliderTag.module.css';

interface MovieTagProps {
  className?: string
  movie: ResultMovies
  fontSize?: number
}

const MovieSliderTag: React.FC<MovieTagProps> = ({
  movie,
  className = '',
  fontSize = 32,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <h3 className={s.name}>
        <span
          className={cn({[s.fontsizing]: fontSize < 32})}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {movie.title}
        </span>
      </h3>
      <div className={s.price}>{getReleaseDate(movie.release_date)}</div>
      <p>{movie.vote_average}</p>
      <Rating value={4} />
    </div>
  );
};

export default MovieSliderTag;
