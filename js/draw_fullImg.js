const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const COMMENTS_STEP = 5;

let commentsToShow = [];
let displayedCommentsCount = 0;

function endWordComment(number){
  if (number % 10 === 1 && number % 100 !== 11){
    return 'комментария';
  }
  return 'комментариев';
}


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


function renderComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = commentsToShow.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP);

  nextComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialCommentsList.appendChild(fragment);
  displayedCommentsCount += nextComments.length;


  commentCountBlock.textContent = `${displayedCommentsCount} из ${commentsToShow.length} ${endWordComment(commentsToShow.length)}`;
  if (displayedCommentsCount >= commentsToShow.length || commentsToShow.length < COMMENTS_STEP) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsToShow = [];
  displayedCommentsCount = 0;
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}


function openBigPicture(photo) {
  if (!photo) {
    return;
  }

  bigPictureImg.src = photo.url ?? '';
  bigPictureImg.alt = photo.description ?? '';
  likesCount.textContent = photo.likes ?? 0;
  commentsCount.textContent = photo.comments?.length ?? 0;
  socialCaption.textContent = photo.description;
  socialCommentsList.innerHTML = '';
  commentsToShow = photo.comments;
  displayedCommentsCount = 0;

  renderComments();

  commentCountBlock.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderComments);

export { openBigPicture };
