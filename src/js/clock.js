const clockField = document.querySelector('.clock');

function checkClock() {
  const getTime = new Date();
  let hours = getTime.getHours();
  let min = getTime.getMinutes();
  let sec = getTime.getSeconds();

  clockField.innerText = `${hours < 9 ? `0${hours}`: hours} : ${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
}

function clockInit() {
  checkClock();
  setInterval(checkClock,1000);
}

clockInit();