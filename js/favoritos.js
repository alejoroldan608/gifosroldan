let clearFav = () => {
    let prueba = document.getElementById('inspirate');
    prueba.classList.remove('crearGifos');
    if (storage.getIdsFavoritos() == "") {
        document.getElementById('inspirate').innerHTML = '';
        changeIcon();
        sinFavoritos(prueba);
        flag = true;
    } else {
        document.getElementById('inspirate').innerHTML = '';
        changeIcon();
        conFavoritos(prueba);
        let container = document.getElementById('results');
        giphy.getGifsPorIds(storage.getIdsFavoritos()).then((gifsData) => {
            if(gifsData!=null)
            gifsData.forEach(gifData => {
                let nGif = new Gif(gifData.title, gifData.username, gifData.images.preview_gif.url, gifData.images.downsized_medium.url, gifData.id);
                showInit(nGif, container);
            });
        });
    }
}

const sinFavoritos = (container) => {
    container.insertAdjacentHTML('beforeend',
    `<img id="logoMis" src="./assets/icons/icon-favoritos.svg"></img>
    <h2 id="titleMis" class="light">Favoritos</h2>
    <div id="results">
        <img id="logoSin" src="./assets/icons/icon-fav-sin-contenido.svg"></img>
        <h2 id="titleAni" class="light">"¡Guarda tu primer GIFO en Favoritos <br> para que se muestre aquí!"</h2>
    </div>`);
}

const conFavoritos = (container) => {
    container.insertAdjacentHTML('beforeend',
    `<img id="logoMis" src="./assets/icons/icon-favoritos.svg"></img>
    <h2 id="titleMis" class="light">Favoritos</h2>
    <div id="results" class="results"></div>`);
}

let showFav = function(gif){
    let contenedor = document.getElementById("results");
    let img = document.createElement("img");
    img.src=gif.url;
    img.id=gif.id;
    contenedor.appendChild(img);
}

let obtenerObjectEnStorage = function () {
    let gifs = giphy.getGifObjects();
}
obtenerObjectEnStorage();






