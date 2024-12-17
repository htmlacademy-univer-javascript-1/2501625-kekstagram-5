import { openBigPicture } from './draw_fullImg.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

// Создание миниатюры фотографии
const createMiniPicture = (photo) => {
  const picture = pictureTemplate.cloneNode(true);

  const img = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  // Проверка на наличие данных
  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes ;
  comments.textContent = photo.comments.length;

  // Открытие большого изображения при клике
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    openBigPicture(photo);
  });

  return picture;
};

// Отрисовка всех миниатюр
const drawMiniature = (data) => {
  const photos = Array.isArray(data) ? data : [];

  photos.forEach((photo) => {
    const pictureElement = createMiniPicture(photo);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { drawMiniature };
