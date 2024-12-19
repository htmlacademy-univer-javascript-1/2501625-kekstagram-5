import { previewImage } from './form-handler.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

// Константы для масштаба
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

// Значения эффектов
const EFFECTS = {
  none: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: '', hideSlider: true },
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'grayscale', hideSlider: false },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'sepia', hideSlider: false },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1, unit: '%', filter: 'invert', hideSlider: false },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1, unit: 'px', filter: 'blur', hideSlider: false },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1, unit: '', filter: 'brightness', hideSlider: false },
};

// Функция установки масштаба
const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

// Обновление эффекта
const updateEffect = (effect) => {
  const effectConfig = EFFECTS[effect];

  if (effectConfig.hideSlider) {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: effectConfig.range,
      start: effectConfig.start, // Устанавливаем стартовое значение на максимальное
      step: effectConfig.step,
    });

    // Устанавливаем начальное значение уровня насыщенности на максимальное
    effectLevelSlider.noUiSlider.set(effectConfig.start);
    effectLevelValue.value = effectConfig.start;

    // Применяем фильтр на максимальном значении
    previewImage.style.filter = effectConfig.filter
      ? `${effectConfig.filter}(${effectConfig.start}${effectConfig.unit})`
      : '';
  }
};

// Инициализация слайдера (с проверкой на существование)
if (!effectLevelSlider.noUiSlider) {
  noUiSlider.create(effectLevelSlider, {
    range: EFFECTS.none.range,
    start: EFFECTS.none.start,
    step: EFFECTS.none.step,
    connect: 'lower',
  });
}

// Применение выбранного эффекта при переключении
effectsRadioButtons.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    const effect = evt.target.value;
    updateEffect(effect);
  });
});

// Обновление фильтра при перемещении слайдера
effectLevelSlider.noUiSlider.on('update', (_, handle, unencoded) => {
  const activeEffect = document.querySelector('.effects__radio:checked').value;
  const effectConfig = EFFECTS[activeEffect];
  const value = unencoded[handle];
  effectLevelValue.value = value;
  previewImage.style.filter = effectConfig.filter
    ? `${effectConfig.filter}(${value}${effectConfig.unit})`
    : '';
});

// Обработчики кнопок для масштаба
scaleControlSmaller.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    setScale(currentScale);
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    setScale(currentScale);
  }
});

// Установка масштаба по умолчанию
setScale(DEFAULT_SCALE);
