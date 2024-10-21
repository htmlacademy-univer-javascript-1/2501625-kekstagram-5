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


function genComments(count) {
  const userComments = [];
  for (let i = 0; i < count; i++) {

    let id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    const idUsers = userComments.map((x) => x.id);
    while (idUsers.includes(id)) {
      id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    }

    const user = {
      id: id,
      avatar: `img/avatar-${Math.floor(Math.random() * (6 - 1 + 1) + 1)}.svg`,
      message: commentText[Math.floor(Math.random() * commentText.length)],
      name: names[Math.floor(Math.random() * names.length)],
    };
    userComments.push(user);
  }
  return userComments;
}


function createPhotoArray() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      likes: Math.floor(Math.random() * (200 - 15 + 1) + 15),
      comments: genComments(Math.floor(Math.random() * 31)),
    };
    photos.push(photo);
  }
  return photos;
}

createPhotoArray();
