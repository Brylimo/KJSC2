const aligndiv = document.querySelector('.align');

function genRandom() {
    const number = Math.floor(Math.random() * 3);
    return number;
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `../public/img/${imgNumber + 1}.jpg`;
    image.classList.add('background');
    aligndiv.appendChild(image);
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();