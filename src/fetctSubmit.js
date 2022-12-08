import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getRequest() {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '31842853-978e72f35827287bca0aab5ce',
          q: `${this.searchQuery}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: `${this.page}`,
          per_page: 40,
        },
      });
      if (response.data.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else if (this.page === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      }

      this.page += 1;

      return response.data;
    } catch (error) {
      Notify.failure(error.message);
    }
  }

  resetPage() {
    this.page = 1;
  }
}
