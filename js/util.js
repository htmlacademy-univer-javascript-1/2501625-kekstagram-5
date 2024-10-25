function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

export {getRandomInt, getRandomElement};
