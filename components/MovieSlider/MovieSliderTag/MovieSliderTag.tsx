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
  console.log(movie);
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
      <div className={s.dateRelease}>{getReleaseDate(movie.release_date)}</div><br />
      <Rating value={Math.round(movie.vote_average)} count={movie.vote_count} className={s.wrapRating} />
    </div>
  );
};

export default MovieSliderTag;
