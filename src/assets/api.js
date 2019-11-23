import axios from 'axios';
const apiKey = 'IGLOYrMAV8KRjzGzj6vvF3dGx2WlASHZ'
const getImg = axios.create({
    baseURL: 'https://api.giphy.com/v1'
});
// const searchPrefix='https://api.giphy.com/v1/gifs/search?api_key=IGLOYrMAV8KRjzGzj6vvF3dGx2WlASHZ&';
export const apiSearch = data => getImg.get(`/gifs/search?api_key=${apiKey}&q=${data.query}&limit=${data.limit}`);
export const apiImgId = data => getImg.get(`/gifs?api_key=${apiKey}&ids=${data.ids}`);