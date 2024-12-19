import {drawMiniature} from './draw_miniature.js';
import './form-handler.js';
import './filter.js';
import {loadData} from './api.js';

// drawMiniature();

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();

  drawMiniature(photos);
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

  // Добавляем сообщение в DOM
  document.body.appendChild(messageAlert);

};

loadData(onSuccess, onFail);
