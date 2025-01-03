import { endWordComment } from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


let commentsToShow = [];
let displayedCommentsCount = 0;

const createCommentElement = (comment) => {
  const commentListItem = document.createElement('li');
  commentListItem .classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const commentText = document.createElement('p');
  commentText .classList.add('social__text');
  commentText .textContent = comment.message;

  commentListItem .appendChild(img);
  commentListItem .appendChild(commentText);

  return commentListItem ;
};

const renderComments = () => {
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
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsToShow = [];
  displayedCommentsCount = 0;
};

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
