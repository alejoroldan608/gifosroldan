let giphy = new Giphy();
let storage = new MiStorage();
const CLASS_FAVORITO='favorito';

giphy.getTextTrending().then((text) => {
    let contString = document.getElementById('reactions');
    contString.innerText = '';
    text.data.forEach((reaction) => {
        contString.insertAdjacentHTML('beforeend', `<a href="javascript:search('${reaction}')" class="light">${reaction + ','}</a>`);
    });
});

giphy.getTrending().then((gifs) => {
    console.log(gifs);
    let contenedor = document.getElementById("galery");
    contenedor.innerHTML='';
    gifs.data.forEach(gifData => {
        let gif = new Gif(gifData.title, gifData.username, gifData.images.preview_gif.url, gifData.images.downsized_medium.url, gifData.id);
        showInit(gif, contenedor);
    });
});

let almacenarObjetoEnStorage = function(gif) {
    giphy.setGifObject(gif);
}

let showInit = function(gif, contenedor){
    let divContent = document.createElement("div");
    divContent.classList.add("gif");
    
    let img = document.createElement("img");
    img.src = gif.url;
    img.dataset.id = gif.id;
    img.dataset.url = gif.url2;
    img.dataset.user = gif.user;
    img.dataset.name = gif.name;
    img.addEventListener('click', giphy.getFullGif);
    divContent.appendChild(img);

    let divOver = document.createElement("div");
    divOver.classList.add("over");
    divContent.appendChild(divOver);

    let divIcons = document.createElement("div");
    divIcons.classList.add("buttonGif");

    let divfavorito = document.createElement("div"); 
    divfavorito.id = gif.id;
    divfavorito.classList.add("no-favorito", "icon"); 
    if(storage.getIdFavoritos(gif.id)!= null) 
        divfavorito.classList.add(CLASS_FAVORITO);  
    divfavorito.addEventListener("click", giphy.driverFav)
    
    divIcons.appendChild(divfavorito);
    
    let divDescarga = document.createElement("div"); 
    divDescarga.id = gif.id;
    divDescarga.dataset.url = gif.url; 
    divDescarga.dataset.nombre = gif.name;
    divDescarga.classList.add("descarga", "icon");
    divDescarga.addEventListener("click",(e)=>{
        giphy.descargarGif(e.currentTarget.dataset['url'], e.currentTarget.dataset['nombre']);
    });
    divIcons.appendChild(divDescarga);
    
    let divFull = document.createElement("div");
    divFull.dataset.id = gif.id;
    divFull.classList.add("full", "icon");
    divFull.dataset.url = gif.url2;
    divFull.dataset.user = gif.user;
    divFull.dataset.name = gif.name;
    divFull.addEventListener('click', giphy.getFullGif);

    divIcons.appendChild(divFull);

    let divInfo = document.createElement("div");
    divInfo.classList.add("infoGif");

    let user = document.createElement("p");
    user.id = "user";
    user.textContent = gif.user;
    divInfo.appendChild(user);

    let title = document.createElement("p");
    title.id =  "title";
    title.textContent = gif.name;

    divInfo.appendChild(title);

    divOver.appendChild(divIcons);
    divOver.appendChild(divInfo);

    divContent.appendChild(divOver);
    contenedor.appendChild(divContent);
}

// Cambio de tema //

let mode = document.getElementById('mode');

function switchTheme() {
    if (document.theme === 'dark') {
        mode.textContent = 'Modo Nocturno';
        replaceClass('dark', 'light');
    } else {
        mode.textContent = 'Modo Diurno';
        replaceClass('light', 'dark');
    }
    changeIcon();
}

function replaceClass(oldClass, newClass) {
    document.theme = newClass;
    var elements = document.getElementsByClassName(oldClass);
    while (elements.length > 0) {
        elements[0].classList.replace(oldClass, newClass);
    }
}

// Menú desplegable //

let icon = document.getElementById('burger');
icon.addEventListener("click", changeIcon);

let i = 1;

function changeIcon() {
    if (i == 1) {
        icon.classList.add('burgerAct');
        icon.alt = 'close';
        let menu = document.getElementById('menu');
        menu.classList.remove('off');
        i = 0;
    } else {
        i = 1;
        icon.classList.remove('burgerAct')
        icon.alt = 'burger';
        let menu = document.getElementById('menu');
        menu.classList.add('off');
    }
};

// Carrusel //

var item = 0;
var left = document.getElementById('prev');
var right = document.getElementById('next');

left.addEventListener('click', ()=>{changeItem(1)});
right.addEventListener('click', ()=>{changeItem(2)});

function changeItem(n){
    if (n == 1) {
        
        if (item == 0) {
            item = 24
        } else {
            item--
        }
    } else {
        if (item == 24) {
            item = 2;
        } else {
            item++
        }
    }

    for (let i = 0; i < document.querySelectorAll(".gif").length; i++) {
        document.querySelectorAll(".gif")[i].style.display = 'none';
    }
    document.querySelectorAll(".gif")[item].style.display = 'flex';
    document.querySelectorAll(".gif")[item + 1].style.display = 'flex';
    document.querySelectorAll(".gif")[item + 2].style.display = 'flex';
}