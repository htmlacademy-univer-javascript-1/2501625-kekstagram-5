const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// Функция открытия полноразмерного изображения
function openBigPicture(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  // Очистка комментариев
  socialCommentsList.innerHTML = '';

  // Заполнение комментариев
  photo.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
    socialCommentsList.appendChild(li);
  });

  socialCaption.textContent = photo.description;

  // Скрыть блоки счётчика комментариев и загрузки новых комментариев
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Открыть окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// Функция закрытия полноразмерного изображения
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// Событие на кнопку закрытия
closeButton.addEventListener('click', closeBigPicture);

// Событие на Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

export { openBigPicture };
