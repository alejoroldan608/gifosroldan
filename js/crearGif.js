let clearCrearGifos = () => {
    document.getElementById('inspirate').innerHTML = '';
    document.getElementById('trending').innerHTML = '';
    let container = document.getElementById('inspirate');
    container.classList.add('crearGifos');
    crearGifos(container);
}
var button;

const crearGifos = (container) => {
    container.insertAdjacentHTML('beforeend',
    `<div id="camara">
        <img id="logoCam" class="light" src="./assets/icons/camara.svg"></img>
        <img id="luzCam" class="light" src="./assets/icons/Path-2.svg"></img>
    </div>
    <div id="containerMisGifos1">
        <div id="pantalla">
            <video id="video"></video>
            <img id="gifrec" class="hide"></img>
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
        <button id="start" class="show">COMENZAR</button>
    </div>
    <img id="cinta" class="light" src="./assets/icons/pelicula.svg" alt="Cinta">`);


    button = document.getElementById('start');
    button.addEventListener('click', () => {
        switch (button.innerText) {
            case 'COMENZAR':
                start();                
                break;
            case 'GRABAR':
                getGrabar();                
                break;
            case 'FINALIZAR':
                getStop();             
                break;
            case 'SUBIR GIFO':
                upLoadGif();                
                break;
            default:
                break;
        }
    })
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
        let string = document.getElementById('string');
        string.style.display = 'none';
        stepTwo.src = "./assets/icons/paso-a-paso-hover.svg";
        stepOne.src = "./assets/icons/paso-a-paso.svg";
        button.classList.remove('hide');
        button.classList.add('show');
        button.innerText = 'GRABAR';
    });
}

const start = () => {
    let h4 = document.getElementsByTagName('h4')[0];
    let pInfo = document.getElementsByTagName('p')[0];
    let stepOne = document.getElementById('one');

    h4.textContent = "¿Nos das acceso a tu cámara?";
    pInfo.textContent = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    stepOne.src = "./assets/icons/paso-a-paso-hover.svg";
    button.classList.remove('show');
    button.classList.add('hide');

    getStreamAndRecord();
}

let recorder;


let seconds = 0;
let minutes = 0;
let hours = 0;
var t;

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
    let crono = document.getElementById('crono');
    crono.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

}

const getGrabar = () => {

    recorder = RecordRTC(video.srcObject, {
        type: 'gif'
    });

    t = setInterval(contar, 1000);
    button.innerText = 'FINALIZAR';
    recorder.startRecording();
}

function getStop() {
    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        let button = document.getElementById('start');
        let crono = document.getElementById('crono');
        button.innerText = 'SUBIR GIFO';
        crono.innerText = 'REPETIR CAPTURA';
        clearInterval(t);
        let video = document.getElementById('video');
        video.classList.add('hide');
        let img = document.getElementById('gifrec');
        img.src = URL.createObjectURL(blob);
        img.classList.remove('hide');
        crono.addEventListener('click', () =>{
            video.classList.remove('hide');
            img.classList.remove('show');
            img.classList.add('hide');
            button.innerText = 'GRABAR';
            crono.innerText = '00:00:00';
            seconds = 0;
            minutes = 0;
            hours = 0;                          
        })
    });
}

function upLoadGif() {    

    giphy.guardarGiphy(recorder.getBlob()).then(data => {
            let s = new MiStorage();
            s.setIdsMisGifs(data.id);
            console.log('Finalizó la carga');
            button.innerText = 'GRABAR';
            let crono = document.getElementById('crono');
            crono.innerText = '00:00:00';
            seconds = 0;
            minutes = 0;
            hours = 0;     
    });
    

    let stepTwo = document.getElementById('two');
    let stepThree = document.getElementById('three');
    stepTwo.src = "./assets/icons/paso-a-paso.svg";
    stepThree.src = "./assets/icons/paso-a-paso-hover.svg";
}