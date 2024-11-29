import { createPhotoArray } from './data.js';
import { openBigPicture } from './draw_fullImg.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

function createMiniPicture(photo) {
  const picture = pictureTemplate.cloneNode(true);

  const img = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  // Добавляем обработчик клика на миниатюру
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    openBigPicture(photo);
  });

  return picture;
}

function drawMiniature() {
  const photos = createPhotoArray();

  photos.forEach((photo) => {
    const pictureElement = createMiniPicture(photo);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}

export { drawMiniature };
