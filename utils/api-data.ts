import {GetMoviesType} from '@type/themovie/moviesType';
import {eivomApi} from 'api';

export const getData = async (url:string) => {
  const res = await eivomApi.get<GetMoviesType>(`${url}&api_key=${process.env.NEXT_PUBLIC_MOVIE_API}`);
  return res;
};
