import axios from "axios";

const key: string = import.meta.env.VITE_REACT_APP_API_KEY;
const baseUrl: string = import.meta.env.VITE_REACT_APP_API_URL;

const getTrendingGifos = async (limit: number = 20, offset: number = 0) => {
    const response = await axios.get(
      `${baseUrl}gifs/trending?api_key=${key}&limit=${limit}&offset=${offset}&rating=g`
    );
    return response.data
}

const trendingTopics = async () => {
  const response = await axios.get(`${baseUrl}trending/searches?api_key=${key}`);
  return response.data;
};

const getSearchGifos = async (query: string, limit: number = 20, offset: number = 0) => {
    const response = await axios.get(`${baseUrl}gifs/search?api_key=${key}&q=${query}&limit=${limit}&offset=${offset}`)
    return response.data
}

const getFavoriteGifos = async (ids: string[]) => {
    const response = await axios.get(`${baseUrl}gifs?api_key=${key}&ids=${ids}`)
    return response.data
}

const createGifo = async (file: Blob) => {
    if (!file) {
        throw new Error('File is undefined or null');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', key);
    const response = await axios.post(`${baseUrl}gifs?api_key=${key}`, formData);
    return response.data;
};

const autoSuggest = async (query: string) => {
    const response = await axios.get(`${baseUrl}gifs/search/tags?api_key=${key}&q=${query}`)
    return response.data
}

export { getTrendingGifos, getSearchGifos, getFavoriteGifos, createGifo, trendingTopics }