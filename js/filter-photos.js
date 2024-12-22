import { shuffleArray, debounce } from './util.js';
import { renderMiniatures, removePictures } from './draw-miniature.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const COUNT_OF_FILTER = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

let photos = [];

document.addEventListener('photosLoaded', (evt) => {
  photos = evt.detail;
});

const applyFilter = (filterId) => {
  switch (filterId) {
    case 'filter-random':
      return shuffleArray(photos).slice(0, COUNT_OF_FILTER);
    case 'filter-discussed':
      return photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length);
    case 'filter-default':
    default:
      return photos.slice();
  }
};

const onImgFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    removePictures();
    const filteredPhotos = applyFilter(evt.target.id);
    renderMiniatures(filteredPhotos);
  }
});

const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = imgFiltersForm.querySelector(`.${ACTIVE_CLASS}`);
    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }
    evt.target.classList.add(ACTIVE_CLASS);
  }
};

imgFiltersForm.addEventListener('click', onImgFiltersFormClick);
imgFiltersForm.addEventListener('click', onButtonClick);
