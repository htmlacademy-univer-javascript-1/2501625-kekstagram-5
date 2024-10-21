function checkLength (line, len) {
  return line.length <= len;
}

function checkPalidrome (line) {
  return line.split(' ').join('').toLowerCase() === line.split(' ').join('').split('').reverse().join('').toLowerCase();
}

function findNumbers (line) {
  const rez = line.toString();
  let count = '';
  for (let i = 0; i < rez.length; i++) {
    if (!Number.isNaN(parseInt(rez[i], 10))){
      count = count + rez[i];
    }
  }
  if (count === ''){
    return NaN;
  }
  return Number(count);
}


checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);


checkPalidrome('топот');
checkPalidrome('ДовОд');
checkPalidrome('Кекс');


findNumbers('2023 год');
findNumbers('ECMAScript 2022');
findNumbers('1 кефир, 0.5 батона');
findNumbers('агент 007');
findNumbers('а я томат');
findNumbers(2023);
findNumbers(-1);
findNumbers(1.5);
