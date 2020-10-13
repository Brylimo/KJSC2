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

function footer() {
    const footer = document.querySelector('.footer');
    footer.innerHTML = `<hr/>
                        <div>
                            <p> Copyright &copy;2020</p>
                        </div>`;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
    setTimeout(footer, 500);
}

init();