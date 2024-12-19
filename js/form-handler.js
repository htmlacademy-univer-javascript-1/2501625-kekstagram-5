import { form, pristine, hashtagsInput, descriptionInput } from './validation.js';
import { unloadData } from './api.js';

const body = document.body;
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
export const previewImage = document.querySelector('.img-upload__preview img');
const DEFAULT_SCALE = 100;

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const scaleControlValue = document.querySelector('.scale__control--value');
const isEscapeKey = (evt) => evt.key === 'Escape';
const checkTypeMessage = () => document.querySelector('.success, .error');

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

// Сброс эффектов
const resetEffects = () => {
  document.querySelector('#effect-none').checked = true;
  previewImage.style.filter = '';
  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.set(0); // Сбрасываем слайдер

  setScale(DEFAULT_SCALE);
};

// Обработчик клавиши Escape для сообщения
const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && checkTypeMessage) {
    evt.preventDefault();
    closeMessageBox();
  }
};

// Обработчик клика по фону сообщения
const onMessageOutsideClick = (evt) => {
  const messageElement = checkTypeMessage();
  if (evt.target === messageElement) {
    closeMessageBox();
  }
};

// Закрытие сообщения
function closeMessageBox() {
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageOutsideClick);
  const messageElement = checkTypeMessage();
  if (messageElement) {
    messageElement.remove();
  }
}

// const openMessageBox = (typeMessage) => {
//   const message = typeMessage === 'success' ? successMessageTemplateElement.cloneNode(true) : errorMessageTemplateElement.cloneNode(true);
//   const messageButton = message.querySelector(`.${typeMessage}__button`);

//   document.body.append(message);

//   messageButton.addEventListener('click', () => {
//     closeMessageBox();
//   });

//   document.addEventListener('keydown', onMessageEscKeydown);
//   document.addEventListener('click', onMessageOutsideClick);
// };


// Переработка обработчиков для формы
const onDocumentKeydown = (evt, closeFormCallback) => {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (isEscapeKey(evt) && !checkTypeMessage() && !isFocus) {
    evt.preventDefault();
    closeFormCallback();
  }
};


const closeUploadForm = () => {
  form.reset();
  pristine.reset();
  resetEffects();

  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closeUploadForm);
};

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


// const onEscKeydown = (evt, removeCallback) => {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     removeCallback();
//   }
// };

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);

  const successButton = document.querySelector('.success__button');
  const successModal = document.querySelector('.success');

  const removeSuccessMessage = () => {
    successModal.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  };

  successModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  });

  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  const errorButton = document.querySelector('.error__button');
  const errorModal = document.querySelector('.error');

  const removeErrorMessage = () => {
    errorModal.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  };

  errorModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeErrorMessage();
    }
  });

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
};


// Обработчик отправки формы
form.addEventListener('submit', async (evt) => {
  const isValid = pristine.validate(); // Проверка валидности

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
        showSuccessMessage();
        closeUploadForm();
      },
      () => {
        showErrorMessage();
      },
      'POST',
      formData
    );
  } catch (error) {
    showErrorMessage();
  } finally {

    submitButton.disabled = false;
  }
});
