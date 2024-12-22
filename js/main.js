import {renderMiniatures} from './draw-miniature.js';
import {loadData} from './api.js';
import './form-handler.js';
import './filter.js';
import './filter-photos.js';


let loadedPhotos = [];

const onSuccess = (data) => {
  loadedPhotos = data.slice();
  renderMiniatures(loadedPhotos);
  // Генерируем событие о загрузке данных
  const event = new CustomEvent('photosLoaded', { detail: loadedPhotos });
  document.dispatchEvent(event);
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.textContent = 'Ошибка при загрузке данных. Пожалуйста, попробуйте обновить страницу или зайдите позже.';

  messageAlert.style.position = 'fixed';
  messageAlert.style.top = '20px';
  messageAlert.style.left = '50%';
  messageAlert.style.transform = 'translateX(-50%)';
  messageAlert.style.backgroundColor = '#ff4d4d';
  messageAlert.style.color = 'white';
  messageAlert.style.padding = '15px 25px';
  messageAlert.style.fontSize = '16px';
  messageAlert.style.fontWeight = 'bold';
  messageAlert.style.borderRadius = '10px';
  messageAlert.style.zIndex = '1000';
  messageAlert.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.8)';

  document.body.appendChild(messageAlert);

};

loadData(onSuccess, onFail);

