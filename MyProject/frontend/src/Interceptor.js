import axios from 'axios';
const apiurl = import.meta.env.VITE_API_BASE_URL;
const apikey = import.meta.env.VITE_API_KEY;

const Interceptor = axios.create({
  baseURL: apiurl,
  headers: {
    "Content-Type": "application/json",    
    "empkey": apikey
  }
});

export default Interceptor;