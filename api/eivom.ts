import axios from 'axios';


const eivomApi = axios.create({
  baseURL: '/api',
});

export default eivomApi;
