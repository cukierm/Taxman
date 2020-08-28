import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'http://10.0.0.12:3000'
})