import axios from 'axios';

export const getEventsByLocation = async (locationId) => {
  const response = await axios.get(`http://localhost:5000/api/events/${locationId}`);
  return response.data;
};
