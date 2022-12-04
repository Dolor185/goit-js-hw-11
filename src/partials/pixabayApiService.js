export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const APIkey = '31659671-7f58f923186c72e7c5776eca1';
    return fetch(
      `${BASE_URL}?key=${APIkey}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40`
    )
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        console.dir(data);
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
