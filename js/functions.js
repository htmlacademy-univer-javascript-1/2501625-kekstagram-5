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
checkPalidrome('топот');
findNumbers('2023 год');


function convertToMinutes(data) {
  const time = data.split(':');
  return Number(time[0]) * 60 + Number(time[1]);
}

function meetingDuringHours(startWork, endWork, startmeeting, duration) {

  const startWorkM = convertToMinutes(startWork);
  const endWorkM = convertToMinutes(endWork);
  const startmeetingM = convertToMinutes(startmeeting);
  return startWorkM <= startmeetingM && startmeetingM + duration <= endWorkM;
}

meetingDuringHours('08:00', '17:30', '14:00', 90); // true
meetingDuringHours('8:0', '10:0', '8:0', 120);     // true
meetingDuringHours('08:00', '14:30', '14:00', 90); // false
meetingDuringHours('14:00', '17:30', '08:0', 90);  // false
meetingDuringHours('8:00', '17:30', '08:00', 900); // false
