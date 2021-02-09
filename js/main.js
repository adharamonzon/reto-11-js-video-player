//elementos
const palyer = document.querySelector('.player');
const video = palyer.querySelector('.viewer');
const progress = palyer.querySelector('.progress');
const progressBar = palyer.querySelector('.progress__filled');
const toggle = palyer.querySelector('.toggle');
const skipButtons = palyer.querySelectorAll('[data-skip]');
const ranges = palyer.querySelectorAll('.player__slider');

//funciones
function togglePlay() {
  //paused es una propiedad dentro de la etiqueta video
 const method = video.paused ? 'play' : 'pause';
 video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip(){
  //parseFloat(), convierte un argumento de tipo cadena y devuelve un número de punto flotante. 
video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//escuchando los eventos
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);


skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);