import axios from 'axios';

const api = axios.create({
  baseURL: 'https://civicare-production.up.railway.app'
});

export default api;