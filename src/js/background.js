const backgroundContainer = document.querySelector('.backgroundContainer');

function backgroundInit() {

  const ImageNumber = Math.floor(Math.random() * 4) + 1;

  backgroundContainer.style.backgroundImage = `url(./images/${ImageNumber}.jpg)`;
}

backgroundInit();
