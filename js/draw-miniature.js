import { openBigPicture } from './draw-fullImg.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesFragment = document.createDocumentFragment();
const imgFiltersSection = document.querySelector('.img-filters');

const createMiniPicture = (photo) => {
  const picture = pictureTemplate.cloneNode(true);

  const img = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes ;
  comments.textContent = photo.comments.length;

  picture.addEventListener('click', (event) => {
    event.preventDefault();
    openBigPicture(photo);
  });

  return picture;
};

const renderMiniatures = (data) => {
  const photos = data;

  photos.forEach((photo) => {
    const pictureElement = createMiniPicture(photo);
    miniaturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(miniaturesFragment);
  imgFiltersSection.classList.remove('img-filters--inactive');
};

const miniaturePictures = picturesContainer.getElementsByClassName('picture');
const removePictures = () => {
  if (miniaturePictures) {
    [...miniaturePictures].forEach((photo) => photo.remove());
  }
};

export {renderMiniatures, removePictures};
