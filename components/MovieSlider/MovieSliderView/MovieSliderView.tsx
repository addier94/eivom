import {Container} from '@components/ui';
import {GetMoviesType} from '@type/themovie/moviesType';
import {PATH_IMAGE} from 'api/eivom';
import cn from 'clsx';
import Image from 'next/image';
import MovieSlider from '../MovieSlider';
import MovieSliderTag from '../MovieSliderTag';
import s from './MovieSliderView.module.css';

const MovieSliderView = ({NowPlaying}:{NowPlaying: GetMoviesType}) => {
  const {results} = NowPlaying;

  return (
    <>
      <Container className='max-w-none w-full' clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>

            <div className={s.sliderContainer}>
              <MovieSlider key={1} className="">
                {results.map((item, i) => (
                  <div key={`${PATH_IMAGE}/${item.poster_path}`} className={s.imageContainer}>
                    <Image
                      // className={s.img}
                      objectFit="cover"
                      src={`${PATH_IMAGE}/${item.poster_path}`}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"

                    />
                    <MovieSliderTag
                      name={item.title}
                      price='38'
                      fontSize={32}
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

export default MovieSliderView;
