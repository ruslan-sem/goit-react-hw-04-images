import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export async function fetchApi(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '31621045-27b3574e35e935623860605ff';
  const searchParams = {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    },
  };

  try {
    return await axios.get(BASE_URL, searchParams);
  } catch (error) {
    // console.error(error);
    Notify.failure(error);
  }
}
