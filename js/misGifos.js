let clearGifos = () => {
    let prueba = document.getElementById('inspirate');
    prueba.classList.remove('crearGifos');
    if (storage.getIdsMisGifs() == "") {
        document.getElementById('inspirate').innerHTML = '';
        changeIcon();
        sinMisGifos(prueba);
        flag = true;
    } else {
        document.getElementById('inspirate').innerHTML = '';
        changeIcon();
        conMisGifos(prueba);
        let container = document.getElementById('results');
        giphy.getGifsPorIds(storage.getIdsMisGifs()).then((gifsData) => {
            if(gifsData != null)
            gifsData.forEach(gifData => {
                let nGif = new Gif(gifData.title, gifData.username, gifData.images.preview_gif.url, gifData.images.downsized_medium.url, gifData.id);
                showInit(nGif, container);
            });
        });
    }
}

const sinMisGifos = (container) => {
    container.insertAdjacentHTML('beforeend',
    `<img id="logoMis" src="./assets/icons/icon-mis-gifos.svg"></img>
    <h2 id="titleMis">Mis GIFOS</h2>
    <img id="logoSin" src="./assets/icons/icon-mis-gifos-sin-contenido.svg"></img>
    <h2 id="titleAni">¡Animate a crear tu primer GIFO!</h2>`);
}

const conMisGifos = (container) => {
    container.insertAdjacentHTML('beforeend',
    `<img id="logoMis" src="./assets/icons/icon-mis-gifos.svg"></img>
    <h2 id="titleMis">Mis GIFOS</h2>
    <div id="results" class="results"></div>`);
}

