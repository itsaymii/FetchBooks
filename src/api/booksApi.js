import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (query, page = 1, maxResults = 10) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: query,
                startIndex: (page - 1) * maxResults,
                maxResults: maxResults,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};