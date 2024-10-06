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
    return 'NaN';
  }
  return count;
}
