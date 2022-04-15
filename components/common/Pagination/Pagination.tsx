import React, {FC} from 'react';
import {ArrowLeft, ArrowRight} from '@components/icons';
import s from './Pagination.module.css';
import cn from 'clsx';
import {useRouter} from 'next/router';

interface Props {
  callback: (page:number) => void,
  currentPage: number | undefined
}

const isActive = ((p:number, current:number) => p === current);

const Pagination:FC<Props> = ({callback, currentPage}) => {
  const limit = 500;

  return (
    <div className={s.root}>
      {currentPage !== 1 &&
      <ArrowLeft onClick={() => callback(currentPage! - 1)} className="bg-secondary text-secondary cursor-pointer h-8 w-6" />
      }
      <ButtonPagination c={currentPage} callback={callback} limit={limit} />
      <p className='text-primary ml-3 px-3 pb-1 font-bold text-xl'>...</p>
      <button className={s.pageLink}
        onClick={() => callback(limit)}>{limit}</button>
      {limit !== currentPage && <ArrowRight
        onClick={() => callback(currentPage! + 1)}
        className="bg-secondary text-secondary ml-3 cursor-pointer h-8 w-6" /> }

    </div>
  );
};

export default Pagination;

interface PropsButtonPagination {
  limit:number,
  callback: (page:number) => void,
  c:number | undefined

}
const ButtonPagination:FC<PropsButtonPagination> = ({c, callback, limit}) => {
  return (
    <>
      {c && [...Array(4)].map((_, i)=> {
        // if the page doesn't exist, don't see more buttons
        if (c+i > limit) return;

        const lastPage = ():boolean => c === limit;

        return (
          <button className={cn(s.pageLink, {[s.activePagination]: isActive(c+i, c)})}
            key={i}
            onClick={() => callback(lastPage() ? 1 : c+i)}>
            {lastPage() ? 1 : c+i}
          </button>);
      })}
    </>
  );
};

