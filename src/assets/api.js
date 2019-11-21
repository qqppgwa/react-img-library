import axios from 'axios';
const apiKey = 'IGLOYrMAV8KRjzGzj6vvF3dGx2WlASHZ'
const keyWordSearch = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs'
});
// const searchPrefix='https://api.giphy.com/v1/gifs/search?api_key=IGLOYrMAV8KRjzGzj6vvF3dGx2WlASHZ&';
export const apiSearch = data => keyWordSearch.get(`/search?api_key=${apiKey}&q=${data.query}&limit=${data.limit}&offset=0&rating=G&lang=en`);