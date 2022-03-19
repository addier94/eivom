import {FC, memo} from 'react';
import rangeMap from '@lib/range-map';
import {Star} from '@components/icons';
import cn from 'clsx';
import s from './Rating.module.css';

export interface RatingProps {
  value: number
  count: number
  className?: string
}

const Quantity: FC<RatingProps> = ({value = 0, count = 0, className=''}) => (
  <div className={cn(s.root, className)}>
    {rangeMap(10, (i) => (
      <span
        key={`star_${i}`}
        className={cn('inline-block ', {
          'text-accent-5': i >= Math.floor(value),
        })}
      >
        <Star className="w-5 h-5" />
      </span>
    ))}
    <p>/<span className='align-middle -tracking-wider font-light text-sm '>{count}</span></p>
  </div>
);

export default memo(Quantity);
