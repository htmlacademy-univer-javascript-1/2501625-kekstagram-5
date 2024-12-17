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


let isFormSubmitted = false;

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

// Обработчик закрытия формы по клавише Escape
const onDoEscape = (evt, closeFormCallback) => {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (evt.key === 'Escape' && !isFocus && !isFormSubmitted) {
    evt.preventDefault();
    closeFormCallback();
  }
};

// Функция закрытия формы
export const closeUploadForm = () => {
  form.reset();
  pristine.reset();
  resetEffects();

  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDoEscape);
  cancelButton.removeEventListener('click', closeUploadForm);
};

// Функция открытия формы
export const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => onDoEscape(evt, closeUploadForm));
  cancelButton.addEventListener('click', closeUploadForm);
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]; // Получаем загруженный файл
  if (file) {
    const reader = new FileReader(); // Создаем объект FileReader для чтения файла

    reader.addEventListener('load', () => {
      previewImage.src = reader.result; // Устанавливаем содержимое файла в src

      const effectPreviews = document.querySelectorAll('.effects__preview');
      effectPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file); // Читаем файл как Data URL
  }
  resetEffects();
  openUploadForm();
});

// Инициализация слайдера
noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 0.1,
  connect: 'lower',
});


const onEscKeydown = (evt, removeCallback) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeCallback();
  }
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);

  const successButton = document.querySelector('.success__button');
  const successModal = document.querySelector('.success');

  const removeSuccessMessage = () => {
    successModal.remove();
    document.removeEventListener('keydown', (evt) => onEscKeydown(evt, removeSuccessMessage));
  };


  successModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  });

  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', (evt) => onEscKeydown(evt, removeSuccessMessage));
};


const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  const errorButton = document.querySelector('.error__button');
  const errorModal = document.querySelector('.error');

  const removeErrorMessage = () => {
    errorModal.remove();
    document.removeEventListener('keydown', (evt) => onEscKeydown(evt, removeErrorMessage));
    isFormSubmitted = false;
    document.addEventListener('keydown', (evt) => onDoEscape(evt, closeUploadForm));
  };

  errorModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeErrorMessage();
    }
  });

  errorButton.addEventListener('click', removeErrorMessage);

  document.addEventListener('keydown', (evt) => onEscKeydown(evt, removeErrorMessage));
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
  isFormSubmitted = true;
  document.removeEventListener('keydown', onDoEscape);

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
  // Разблокируем кнопку после завершения запроса
    submitButton.disabled = false;
  }
});
