// import { useRef } from "react";
// // const allow: HTMLElement = document.querySelector('.snap');
// // const start: HTMLElement = document.querySelector('.snapNewGifo');
// // const stop: HTMLElement = document.querySelector('.stopNewGifo');
// // const uploadNewGifo: HTMLElement = document.querySelector('.uploadNewGifo');
// // const middleContainer: HTMLElement = document.querySelector('.middleContainer');
// // const one: HTMLElement = document.querySelector('.one');
// // const two: HTMLElement = document.querySelector('.two');
// // const three: HTMLElement = document.querySelector('.three');
// // const chro: HTMLElement = document.querySelector('.chronometer');
// // const repeatSnap: HTMLElement = document.querySelector('.repeatSnapContainer');

//   const allow = useRef();
//   const start = useRef();
//   const stop = useRef();
//   const uploadNewGifo = useRef();
//   const middleContainer = useRef();
//   const one = useRef();
//   const two = useRef();
//   const three = useRef();
//   const chro = useRef();
//   const repeatSnap = useRef();

// // button to give access to the camera
// allow.addEventListener('click', () => {
//   middleContainer.innerHTML = markup.accessCamera();
//   allow.style.display = 'none';
//   one.classList.add('oneActive');

//   const constraints = { audio: false, video: { width: 1280, height: 720 } };

//   //request to acces the camera (promise)
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(function (mediaStream) {
//       middleContainer.innerHTML = '<video autoplay></video>';
//       one.classList.remove('oneActive');
//       two.classList.add('twoActive');
//       allow.style.display = 'none';
//       start.style.display = 'block';

//       const video = document.querySelector('video');
//       video.srcObject = mediaStream;
//       video.onloadedmetadata = () => {
//         // show the live video onto the screen
//         video.play();
//       };

//       //?add listeners for saving video/audio
//       // let start = document.getElementById('btnStart');
//       // let stop = document.getElementById('btnStop');
//       let mediaRecorder = new MediaRecorder(mediaStream);
//       let chunks = [];

//       start.addEventListener('click', () => {
//         mediaRecorder.start();
//         console.log(mediaRecorder.state);

//         start.style.display = 'none';
//         stop.style.display = 'block';
//         chro.style.display = 'flex';
//         chronometer();
//       });

//       stop.addEventListener('click', () => {
//         mediaRecorder.stop();
//         console.log(mediaRecorder.state);

//         stop.style.display = 'none';
//         uploadNewGifo.style.display = 'block';
//         chro.style.display = 'none';
//         repeatSnap.style.display = 'flex';
//         middleContainer.innerHTML = '<video id="vid2" autoplay loop></video>';
//       });

//       repeatSnap.addEventListener('click', () => {
//         middleContainer.innerHTML = '<video autoplay></video>';
//         start.style.display = 'block';
//         uploadNewGifo.style.display = 'none';
//         repeatSnap.style.display = 'none';

//         var video = document.querySelector('video');
//         video.srcObject = mediaStream;
//         video.onloadedmetadata = function (e) {
//           // show the live video onto the screen
//           video.play();
//         };
//       });

//       mediaRecorder.ondataavailable = (ev) => {
//         chunks.push(ev.data);
//       };

//       mediaRecorder.onstop = (ev) => {
//         let vidSave = document.getElementById('vid2');
//         // let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
//         let blob = new Blob(chunks, { type: 'image/gif;' });
//         chunks = [];
//         let videoURL = window.URL.createObjectURL(blob);
//         vidSave.src = videoURL;
//         console.log(videoURL);
//         console.log(vidSave);

//         // mediaStream.getTracks().forEach(function(track) {
//         //   track.stop();
//         // });

//         uploadNewGifo.addEventListener('click', () => {
//           mediaStream.getTracks().forEach(function (track) {
//             track.stop();
//           });
//           two.classList.remove('twoActive');
//           three.classList.add('threeActive');
//           repeatSnap.style.display = 'none';
//         });
//       };
//     })
//     .catch(function (err) {
//       console.log(err.name + ': ' + err.message);
//       alert('Algo paso con la camara');
//     });
// });

// //chronometer function
// const chronometer = () => {
//   var start = new Date().getTime();
//   var now, elapsed, h, m, s, format;
//   setInterval(function () {
//     now = new Date().getTime();
//     elapsed = now - start;
//     h = Math.floor((elapsed % 86400000) / 3600000);
//     m = Math.floor((elapsed % 3600000) / 60000);
//     s = Math.floor((elapsed % 60000) / 1000);
//     format = ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
//     document.getElementById('chro').innerHTML = format;
//   }, 1);
// };
