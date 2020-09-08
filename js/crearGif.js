let clearCrearGifos = () => {
    document.getElementById('inspirate').innerHTML = '';
    document.getElementById('trending').innerHTML = '';
    let container = document.getElementById('inspirate');
    container.classList.add('crearGifos');
    crearGifos(container);
}

const crearGifos = (container) => {
    container.insertAdjacentHTML('beforeend',
    `<div id="camara">
        <img id="logoCam" class="light" src="./assets/icons/camara.svg"></img>
        <img id="luzCam" class="light" src="./assets/icons/Path-2.svg"></img>
    </div>
    <div id="containerMisGifos1">
        <div id="pantalla">
            <video id="video">

            </video>
            <div id="esquinasSup">
                    <div id="supIzq" class="corner"></div>
                    <div id="supDer" class="corner"></div>
                </div>
                <div id="string">
                    <h4>Aquí podrás<br>crear tus propios<span id="Gifos"> GIFOS</span></h4>
                    <p>¡Crea tu GIFO en sólo 3 pasos!<br>(sólo necesitas una cámara para grabar un video)</p>
                </div>
                <div id="esquinasInf">
                    <div id="infIzq" class="corner"> </div>
                    <div id="infDer" class="corner"></div>
                </div>
        </div>
        <div id="contNumCrono">
        <div id="numeros">
            <img id="one" class="num" src="./assets/icons/paso-a-paso.svg" alt="one">
            <img id="two" class="num" src="./assets/icons/paso-a-paso.svg" alt="two">
            <img id="three" class="num" src="./assets/icons/paso-a-paso.svg" alt="three">         
        </div>
        <h5 id="crono">00:00:00</h5>
        </div>
        <div id="linea"></div>
        <button id="start" class="show" onclick="start()">COMENZAR</button>
    </div>
    <img id="cinta" class="light" src="./assets/icons/pelicula.svg" alt="Cinta">`);
}

function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    }).then(function(stream) {
        video.srcObject = stream;
        video.play();

        let stepOne = document.getElementById('one');
        let stepTwo = document.getElementById('two');
        let button = document.getElementById('start');
        let string = document.getElementById('string');
        string.style.display = 'none';
        stepTwo.src = "./assets/icons/paso-a-paso-hover.svg";
        stepOne.src = "./assets/icons/paso-a-paso.svg";
        button.classList.remove('hide');
        button.classList.add('show');
        button.innerText = 'GRABAR';
        button.onclick = getGrabar;
    });
}

const start = () => {
    let h4 = document.getElementsByTagName('h4')[0];
    let pInfo = document.getElementsByTagName('p')[0];
    let button = document.getElementById('start');
    let stepOne = document.getElementById('one');

    h4.textContent = "¿Nos das acceso a tu cámara?";
    pInfo.textContent = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    stepOne.src = "./assets/icons/paso-a-paso-hover.svg";
    button.classList.remove('show');
    button.classList.add('hide');

    getStreamAndRecord();
}

let recorder;

const getGrabar = () => {

    let crono = document.getElementById('crono');
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let t;

    function contar() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        crono.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        timer();
    }

    function timer() {
        t = setTimeout(contar, 1000);
    }

    let button = document.getElementById('start');
    let video = document.getElementById('video');
    button.innerText = 'FINALIZAR';

    recorder = RecordRTC(video.srcObject, {
        type: 'gif'
    });

    recorder.startRecording();

    timer();

    button.onclick = function () {
        clearTimeout(t);
        getStop();
    }
}

function getStop() {
    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        let button = document.getElementById('start');
        let crono = document.getElementById('crono');

        button.innerText = 'SUBIR GIFO';
        crono.innerText = 'REPETIR CAPTURA';

        button.addEventListener('click', () => {
            upLoadGif(blob);
        })
    });
}

function upLoadGif(blob) {
    giphy.guardarGiphy(blob).then(data => {
            let s = new MiStorage();
            s.setIdsMisGifs(data.id);
            console.log('Finalizó la carga');
    });

    let stepTwo = document.getElementById('two');
    let stepThree = document.getElementById('three');
    stepTwo.src = "./assets/icons/paso-a-paso.svg";
    stepThree.src = "./assets/icons/paso-a-paso-hover.svg";
}