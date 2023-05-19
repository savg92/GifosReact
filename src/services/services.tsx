import axios from "axios"
// import dotenv from 'dotenv';

// dotenv.config();

const key: string = 'fR97ryv0E6dG1MOKj8684haXx8ycLTiy';
const baseUrl: string = 'https://api.giphy.com/v1/'
// console.log(key)

const getTrendingGifos = async (limit: number = 20, offset: number = 0) => {
    const response = await axios.get(
      `${baseUrl}gifs/trending?api_key=${key}&limit=${limit}&offset=${offset}&rating=g`
    );
    return response.data
}

const getSearchGifos = async (query: string, limit: number = 20, offset: number = 0) => {
    const response = await axios.get(`${baseUrl}gifs/search?api_key=${key}&q=${query}&limit=${limit}&offset=${offset}`)
    return response.data
}

const getFavoriteGifos = async (ids: string[]) => {
    const response = await axios.get(`${baseUrl}gifs?api_key=${key}&ids=${ids.join(',')}`)
    return response.data
}

const postGifo = async (file: Blob) => {
    if (!file) {
        throw new Error('File is undefined or null');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', key);
    const response = await axios.post(`${baseUrl}gifs?api_key=${key}`, formData);
    return response.data;
};

const trendingTopics = async () => {
    const response = await axios.get(`${baseUrl}trending/searches?api_key=${key}`)
    return response.data
}

export { getTrendingGifos, getSearchGifos, getFavoriteGifos, postGifo, trendingTopics }