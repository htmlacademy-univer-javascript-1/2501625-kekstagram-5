const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_COUNT = 5;
const HASH_PATTERN = /^#[A-Za-z0-9А-Яа-я]{1,19}$/;

export const form = document.querySelector('.img-upload__form');
export const hashtagsInput = document.querySelector('.text__hashtags');
export const descriptionInput = document.querySelector('.text__description');


export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});


const validateDescription = (value) => !value || value.length <= MAX_COMMENT_LENGTH;

const validateHashtagsParts = (value) => {
  if (value.trim() === '') {
    return { isCorrectCount: true, isUniqueHash: true, isTrueHash: true };
  }

  // Удаляем лишние пробелы и разбиваем строку по пробелам
  const hashtags = value.trim().split(/\s+/).map((hashtag) => hashtag.toLowerCase());

  const isCorrectCount = hashtags.length <= MAX_HASH_COUNT;
  const isUniqueHash = new Set(hashtags).size === hashtags.length;
  let isTrueHash = true;
  for (const hashtag of hashtags) {
    if (!HASH_PATTERN.test(hashtag)) {
      isTrueHash = false;
      break;
    }
  }

  return {isCorrectCount, isUniqueHash, isTrueHash};
};

const validateHashtags = (value) => {
  const {isCorrectCount, isUniqueHash, isTrueHash} = validateHashtagsParts(value);
  return isCorrectCount && isUniqueHash && isTrueHash;
};

const getHashMessage = (value) => {
  const {isCorrectCount, isUniqueHash, isTrueHash} = validateHashtagsParts(value);
  if(!isCorrectCount){
    return 'Больше 5 хеш-тегов указывать нельзя';
  }

  if(!isUniqueHash){
    return 'Нельзя писать одинаковые хэш-теги';
  }

  if(!isTrueHash){
    return 'Неправильный хэш-тег';
  }
};

pristine.addValidator(hashtagsInput, validateHashtags, getHashMessage);
pristine.addValidator(descriptionInput, validateDescription, 'Комментарий не может быть длиннее 140 символов');

