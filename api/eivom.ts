import axios from 'axios';

export const movieURL = 'https://api.themoviedb.org/3';
export const PATH_IMAGE = 'https://image.tmdb.org/t/p/w500';

const eivomApi = axios.create({
  baseURL: `${movieURL}`,
});

export default eivomApi;
