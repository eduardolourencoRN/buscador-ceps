import axios from "axios";

const api = axios.create({
  baseURL: 'https://brasilapi.com.br', // substitua pela sua URL de API
});

export const fetchUserData = async (cep) => {
  try {
    const response = await api.get(`/api/cep/v1/${cep}`);
    return response.data;
    console.log(response)
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
