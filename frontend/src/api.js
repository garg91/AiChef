import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const generateMealPlan = async (data) => {
    try {
        const response = await api.post('/generate-plan', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
