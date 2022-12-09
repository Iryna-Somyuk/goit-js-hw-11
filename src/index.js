import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import apiService from './fetctSubmit.js';

const form = document.querySelector('.search-form');
const loadBtn = document.querySelector('.load-more');
const listPhoto = document.querySelector('.gallery');
const input = document.querySelector('[name=searchQuery]');

loadBtn.addEventListener('click', onLoad);
form.addEventListener('submit', onSearch);
input.addEventListener('input', offLoad);

let counter = 40;
loadBtn.hidden = true;

const ApiService = new apiService();

function onClear() {
  listPhoto.innerHTML = '';
}
function offLoad() {
  loadBtn.hidden = true;
}
function onSearch(evn) {
  evn.preventDefault();
  ApiService.searchQuery = evn.currentTarget.elements.searchQuery.value;
  console.log(ApiService.searchQuery);

  if (ApiService.searchQuery === '') {
    loadBtn.hidden = true;
    onClear();
    return Notify.failure('Sorry, there are no images matching your search query. Please enter something!');
  }
  ApiService.resetPage();
  ApiService.getRequest().then(data => {
    console.log(data);
    onClear();
    createMarkupGallery(data);
    loadBtn.hidden = false;
  });
}

function onLoad() {
  ApiService.getRequest().then(data => {
    createMarkupGallery(data);
    counter += data.hits.length;

    if (counter >= data.totalHits) {
      // console.log(data.totalHits);
      loadBtn.hidden = true;
      return Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function createMarkupGallery(data) {
  const markupGallery = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
     <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="picture"  /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
    </div>`
    )
    .join('');

  listPhoto.insertAdjacentHTML('beforeend', markupGallery);

  smoothScroll();

  new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}
