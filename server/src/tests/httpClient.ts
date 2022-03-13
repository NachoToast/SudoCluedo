import axios from 'axios';

const httpClient = axios.create({
    baseURL: `http://localhost:${process.env.PORT}`,
});

export default httpClient;
