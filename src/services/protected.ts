import api from '../lib/api';

export const getDashboardData = async () => {
  const token = localStorage.getItem('token');

  const response = await api.get('/api/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
