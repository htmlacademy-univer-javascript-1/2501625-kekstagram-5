import { openBigPicture } from './draw_fullImg.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
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

const drawMiniature = (data) => {
  const photos = Array.isArray(data) ? data : [];

  photos.forEach((photo) => {
    const pictureElement = createMiniPicture(photo);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
  imgFiltersSection.classList.remove('img-filters--inactive');
};

const photos1 = picturesContainer.getElementsByClassName('picture');
const removePictures = () => {
  if (photos1) {
    [...photos1].forEach((photo) => photo.remove());
  }
};

export { drawMiniature, removePictures};
