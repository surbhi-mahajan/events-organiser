import axios from 'axios';
import { $notifier } from '../shared/components/Notifier/plugin';

axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('userID');
    return config;
  }, (error) => {
        $notifier.show({ text: 'Oops! Something went wrong. Please try again.', type: 'error' });
        return Promise.reject(error);
  });

axios.interceptors.response.use((response) => {
    if (response.data.error) {
        $notifier.show({ text: response.data.error, type: 'error' });
        return Promise.reject(response.data.error);
    }
    return response;
  }, (config) => {
        $notifier.show({
            text: config.response.data.error || 'Oops! Something went wrong. Please try again.',
            type: 'error',
        });
        return Promise.reject(config.response.data.error);
  });
