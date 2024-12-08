import { form, pristine, hashtagsInput, descriptionInput } from './validation.js';

const body = document.body;
const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
export const previewImage = document.querySelector('.img-upload__preview img'); // Найдите элемент <img> внутри контейнера предварительного просмотра.

const DEFAULT_SCALE = 100;

// Дополнительные элементы
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


// Обработчик закрытия формы по клавише Escape
function onDoEscape(evt) {
  const isFocus = [hashtagsInput, descriptionInput].some((x) => x === evt.target);
  if (evt.key === 'Escape' && !isFocus) {
    evt.preventDefault();
    closeUploadForm();
  }
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]; // Получаем загруженный файл
  if (file) {
    const reader = new FileReader(); // Создаем объект FileReader для чтения файла

    reader.addEventListener('load', () => {
      previewImage.src = reader.result; // Устанавливаем содержимое файла в src
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


