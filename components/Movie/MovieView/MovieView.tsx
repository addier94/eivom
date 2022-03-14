import {Container} from '@components/ui';
import {GetMoviesType, ResultMovies} from '@type/themovie/moviesType';
import {PATH_IMAGE} from 'api/eivom';
import cn from 'clsx';
import Image from 'next/image';
import MovieSlider from '../MovieSlider';
import MovieTag from '../MovieTag';
import s from './MovieView.module.css';

const MovieView = ({NowPlaying}:{NowPlaying: GetMoviesType}) => {
  const {results} = NowPlaying;

  return (
    <>
      <Container className='max-w-none w-full' clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <MovieTag
              name='nice Movie'
              price='38'
              fontSize={32}
            />
            <div className={s.sliderContainer}>
              <MovieSlider key={1}>
                {results.map((item, i) => (
                  <div key={`${PATH_IMAGE}/${item.poster_path}`} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={`${PATH_IMAGE}/${item.poster_path}`}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>

                ))}
              </MovieSlider>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MovieView;
