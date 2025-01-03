import { form, pristine, hashtagsInput, descriptionInput } from './validation.js';
import { unloadData } from './api.js';

const DEFAULT_SCALE = 100;

const body = document.body;
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
export const previewImage = document.querySelector('.img-upload__preview img');

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const scaleControlValue = document.querySelector('.scale__control--value');
const isEscapeKey = (evt) => evt.key === 'Escape';
const getMessageElement = () => document.querySelector('.success, .error');

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const resetEffects = () => {
  document.querySelector('#effect-none').checked = true;
  previewImage.style.filter = '';
  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.set(0);

  setScale(DEFAULT_SCALE);
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && getMessageElement) {
    evt.preventDefault();
    closeMessageBox();
  }
};

const onMessageOutsideClick = (evt) => {
  const messageElement = getMessageElement();
  if (evt.target === messageElement) {
    closeMessageBox();
  }
};

function closeMessageBox() {
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageOutsideClick);
  const messageElement = getMessageElement();
  if (messageElement) {
    messageElement.remove();
  }
}


const onDocumentKeydown = (evt) => {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (isEscapeKey(evt) && !getMessageElement() && !isFocus) {
    evt.preventDefault();
    closeUploadForm();
  }
};

function closeUploadForm() {
  form.reset();
  pristine.reset();
  resetEffects();

  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closeUploadForm);
}

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', closeUploadForm);
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;

      const effectPreviews = document.querySelectorAll('.effects__preview');
      effectPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file);
  }
  resetEffects();
  openUploadForm();
});


noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 0.1,
  connect: 'lower',
});


const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const messageButton = document.querySelector(`.${type}__button`);
  const messageModal = document.querySelector(`.${type}`);

  const removeMessage = () => {
    messageModal.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  };

  messageModal.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      removeMessage();
    }
  });

  messageButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
};

form.addEventListener('submit', async (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    return;
  }

  evt.preventDefault();

  const formData = new FormData(form);
  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;


  try {
    await unloadData(
      () => {
        showMessage('success');
        closeUploadForm();
      },
      () => {
        showMessage('error');
      },
      'POST',
      formData
    );
  } catch (error) {
    showMessage('error');
  } finally {

    submitButton.disabled = false;
  }
});
