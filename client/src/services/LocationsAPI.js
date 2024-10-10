import axios from 'axios';

export const getAllLocations = async () => {
  const response = await axios.get('http://localhost:5000/api/locations');
  return response.data;
};
