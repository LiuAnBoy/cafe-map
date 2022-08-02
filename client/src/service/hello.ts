import axios from 'axios';

export const requestHello = async () => {
  const path = '/api';
  const res = await axios.get(path);
  return res;
};
