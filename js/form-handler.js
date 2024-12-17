import { form, pristine, hashtagsInput, descriptionInput } from './validation.js';
import { unloadData } from './api.js';

const body = document.body;
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
export const previewImage = document.querySelector('.img-upload__preview img');
const DEFAULT_SCALE = 100;

//const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const scaleControlValue = document.querySelector('.scale__control--value');

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

// Сброс эффектов
const resetEffects = () => {
  // Устанавливаем фильтр "Оригинал"
  document.querySelector('#effect-none').checked = true;
  previewImage.style.filter = '';
  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.set(0); // Сбрасываем слайдер

  // Сбрасываем масштаб
  setScale(DEFAULT_SCALE);
};

// Обработчик закрытия формы по клавише Escape
const onDoEscape = (evt) => {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (evt.key === 'Escape' && !isFocus) {
    evt.preventDefault();
    closeUploadForm();
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

  document.addEventListener('keydown', onDoEscape);
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

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeErrorMessage();
  }
};

// Функция показа сообщения об успешной отправке
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);

  const successButton = document.querySelector('.success__button');
  const successModal = document.querySelector('.success');

  const removeSuccessMessage = () => {
    successModal.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  document.addEventListener('keydown', onEscKeydown);
  successModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  });
  successButton.addEventListener('click', removeSuccessMessage);
};

// Функция показа сообщения об ошибке
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  const errorButton = document.querySelector('.error__button');
  const errorModal = document.querySelector('.error');

  const removeErrorMessage = () => {
    errorModal.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };



  document.addEventListener('keydown', onEscKeydown);
  errorModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeErrorMessage();
    }
  });
  errorButton.addEventListener('click', removeErrorMessage);
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

  try {
    const response = await unloadData(
      (data) => {
        showSuccessMessage();
        closeUploadForm();
      },
      (error) => {

        showErrorMessage();
      },
      'POST',
      formData
    );
  } catch (error) {
    showErrorMessage();
  }
});

