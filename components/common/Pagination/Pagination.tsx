import React, {FC} from 'react';
import {ArrowLeft, ArrowRight} from '@components/icons';
import s from './Pagination.module.css';

interface Props {
  checkCurrentPage: () => void,
  total_pages: number | undefined
}

const Pagination:FC<Props> = ({checkCurrentPage, total_pages}) => {
  return (
    <div className={s.root}>
      <ArrowLeft className="bg-secondary text-secondary cursor-pointer h-8 w-6" />
      <a className={s.active} href="">1</a>
      <a href="">2</a>
      <a href="">4</a>
      <p className='text-primary ml-3 px-3 pb-1 font-bold text-xl'>...</p>
      <a href="">30</a>
      <ArrowRight className="bg-secondary text-secondary ml-3 cursor-pointer h-8 w-6" />

    </div>
  );
};

export default Pagination;
