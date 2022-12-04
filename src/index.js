import PixabayApiService from './partials/pixabayApiService';
import imageTpl from './markup.hbs';
import { Notify } from 'notiflix';
let totalShow = 0;

const pixabayApiServise = new PixabayApiService();

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  pixabayApiServise.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiServise.resetPage();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('hidden');
  totalShow = 0;
  fetchImageFromApi().then(r => {
    if (!r.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.info(`Hooray! We found ${r.totalHits} images.`);
    appendImagesMarkup(r);
  });
}

function onLoadMore(e) {
  fetchImageFromApi().then(r => {
    appendImagesMarkup(r);
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTpl(images.hits));
  refs.loadMoreBtn.classList.remove('hidden');
  totalShow += images.length;

  if (totalShow == images.totalHits) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

const fetchImageFromApi = async () => {
  const response = await pixabayApiServise.fetchImages();
  return response;
};
