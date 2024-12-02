const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsStep = 5; // шаг показа комментариев

let commentsToShow = []; // хранение комментариев фотографии
let displayedCommentsCount = 0; // количество отображённых комментариев

function endWordComment(number){
  if (number % 10 === 1 && number % 100 !== 11){
    return 'комментария';
  }
  return 'комментариев';
}

// Функция для создания DOM элемента комментария
function createCommentElement(comment) {
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

  return li;
}

// Функция для отображения комментариев частями
function renderComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = commentsToShow.slice(displayedCommentsCount, displayedCommentsCount + commentsStep);

  nextComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialCommentsList.appendChild(fragment);
  displayedCommentsCount += nextComments.length;

  // Обновляем отображение счётчика комментариев
  commentCountBlock.textContent = `${displayedCommentsCount} из ${commentsToShow.length} ${endWordComment(commentsToShow.length)}`;

  // Скрываем кнопку загрузки, если все комментарии показаны
  if (displayedCommentsCount >= commentsToShow.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

// Функция открытия полноразмерного изображения
function openBigPicture(photo) {
  if (!photo) {
    return;
  }
  bigPictureImg.src = photo.url ?? '';
  bigPictureImg.alt = photo.description ?? '';
  likesCount.textContent = photo.likes ?? 0;
  commentsCount.textContent = photo.comments?.length ?? 0;

  // Устанавливаем описание изображения
  socialCaption.textContent = photo.description;

  // Очищаем комментарии и сбрасываем состояние
  socialCommentsList.innerHTML = '';
  commentsToShow = photo.comments;
  displayedCommentsCount = 0;

  // Показываем первые комментарии
  renderComments();

  // Показываем блоки счётчика комментариев и кнопки загрузки
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Открываем окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// Функция закрытия полноразмерного изображения
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown); // удаляем его при закрытии
}

// Событие на кнопку закрытия
closeButton.addEventListener('click', closeBigPicture);


// Событие для загрузки дополнительных комментариев
commentsLoader.addEventListener('click', renderComments);

export { openBigPicture };
