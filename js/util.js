const shuffleArray = (arr) => {
  const array = arr.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const endWordComment = (number) => {
  if (number % 10 === 1 && number % 100 !== 11){
    return 'комментария';
  }
  return 'комментариев';
};

export {endWordComment, shuffleArray, debounce};
