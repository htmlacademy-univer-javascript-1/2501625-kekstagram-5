import { form, pristine, hashtagsInput, descriptionInput } from './validation.js';

const body = document.body;
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');


// Функция закрытия формы
export const closeUploadForm = () => {

  form.reset();
  pristine.reset();

  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDoEscape);
  cancelButton.removeEventListener('click', closeUploadForm);

};


// Функция открытия формы
export const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDoEscape);
  cancelButton.addEventListener('click', closeUploadForm);

};


// Обработчик закрытия формы по клавише Escape
function onDoEscape(evt) {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (evt.key === 'Escape' && !isFocus) {
    evt.preventDefault();
    closeUploadForm();
  }
}

fileInput.addEventListener('change', () => {
  openUploadForm();
});
