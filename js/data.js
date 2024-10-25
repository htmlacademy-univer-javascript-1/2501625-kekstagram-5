import { getRandomInt, getRandomElement } from './util.js';

const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;

const descriptions = [
  'Закат над морем. Красота!',
  'Мой любимый питомец',
  'Вечерняя прогулка по парку',
  'Новая коллекция одежды',
  'Поездка на машине по горному серпантину',
  'Прекрасный вид с вершины горы',
  'Я люблю свою семью!',
  'Кулинарный шедевр',
  'Вкусный десерт',
  'Моя любимая книга',
  'Музыкальный концерт',
  'Фотография с друзьями',
  'Забавный момент',
  'Наслаждаюсь жизнью',
  'Уютный вечер дома',
  'Красивая архитектура',
  'Фотография с путешествия',
  'Спорт - это жизнь!',
  'Красивый пейзаж',
  'Живописная природа',
  'Новый проект',
  'Творчество в процессе',
  'Вдохновляющая цитата',
  'Мое хобби - фотография',
  'Вдохновляющая история'
];

const commentText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Алексей', 'Екатерина', 'Иван', 'Ольга', 'Дмитрий', 'Анна', 'Сергей',
  'Марина', 'Андрей', 'Наталья', 'Александр', 'Елена', 'Максим', 'Светлана', 'Владимир'];


function generateComments(count) {
  const userComments = [];
  for (let i = 0; i < count; i++) {
    let id = getRandomInt(MIN_COMMENT_ID, MAX_COMMENT_ID);
    const idUsers = userComments.map((x) => x.id);
    while (idUsers.includes(id)) {
      id = getRandomInt(MIN_COMMENT_ID, MAX_COMMENT_ID);
    }

    const user = {
      id: id,
      avatar: `img/avatar-${getRandomInt(1, AVATAR_COUNT)}.svg`,
      message: getRandomElement(commentText),
      name: getRandomElement(names),
    };
    userComments.push(user);
  }
  return userComments;
}


function createPhotoArray() {
  const photos = [];
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomElement(descriptions),
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: generateComments(getRandomInt(0, MAX_COMMENTS)),
    };
    photos.push(photo);
  }
  return photos;
}

export{createPhotoArray};
