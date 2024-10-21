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
    if (!Number.isNaN(parseInt(rez[i]))){
      count = count + rez[i];
    }
  }
  if (count === ''){
    return NaN;
  }
  return Number(count);
}


console.log(checkLength('проверяемая строка', 20));
console.log(checkLength('проверяемая строка', 18));
console.log(checkLength('проверяемая строка', 10));


console.log(checkPalidrome('топот'));
console.log(checkPalidrome('ДовОд'));
console.log(checkPalidrome('Кекс'));


console.log(findNumbers('2023 год'));
console.log(findNumbers('ECMAScript 2022'));
console.log(findNumbers('1 кефир, 0.5 батона'));
console.log(findNumbers('агент 007'));
console.log(findNumbers('а я томат'));
console.log(findNumbers(2023));
console.log(findNumbers(-1));
console.log(findNumbers(1.5));
