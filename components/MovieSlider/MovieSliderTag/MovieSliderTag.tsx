import cn from 'clsx';
import {inherits} from 'util';
import s from './MovieSliderTag.module.css';

interface MovieTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
}

const MovieSliderTag: React.FC<MovieTagProps> = ({
  name,
  price,
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
          {name}
        </span>
      </h3>
      <div className={s.price}>{price}</div>
    </div>
  );
};

export default MovieSliderTag;
