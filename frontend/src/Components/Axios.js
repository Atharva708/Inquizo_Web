import axios from 'axios';

const baseUrl = 'http://127.0.0.8000';
const axiosInstance = axios.create({
    baseUrl:baseUrl,
    timeout:5000,
    headers: {
        'Content-Type': 'application/json',
         accept: 'application/json',
    },
})

export default axiosInstance;