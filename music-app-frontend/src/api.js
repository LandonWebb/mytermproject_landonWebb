import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);
export const getAlbums = () => API.get('/albums');
export const getReviews = () => API.get('/reviews');
