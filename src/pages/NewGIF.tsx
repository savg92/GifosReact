import { useRef } from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../components/layout/layout';
import AccessCamera from '../components/newGIF/accessCamera';
import StartGifProcess from '../components/newGIF/StartGifProcess';

const NewGIF = () => {
  const allow = useRef<HTMLButtonElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const stop = useRef<HTMLButtonElement>(null);
  const uploadNewGifo = useRef<HTMLButtonElement>(null);
  const middleContainer = useRef<HTMLDivElement>(null);
  const one = useRef<HTMLButtonElement>(null);
  const two = useRef<HTMLButtonElement>(null);
  const three = useRef<HTMLButtonElement>(null);
  const chro = useRef<HTMLButtonElement>(null);
  const repeatSnap = useRef(null);

  // // button to give access to the camera
  // if (allow.current) {
  //   allow.current.addEventListener('click', () => {
  //     // middleContainer.current.innerHTML = AccessCamera();
  //     if (middleContainer.current) {
  //       middleContainer.current.innerHTML = renderToString(AccessCamera());
  //     }
  //     // allow.style.display = 'none';
  //     allow.current.classList.add('displayNone');
  //     one.classList.add('oneActive');

  //     const constraints = { audio: false, video: { width: 1280, height: 720 } };

  //     //request to acces the camera (promise)
  //     navigator.mediaDevices
  //       .getUserMedia(constraints)
  //       .then(function (mediaStream) {
  //         middleContainer.innerHTML = '<video autoplay></video>';
  //         one.classList.remove('oneActive');
  //         two.classList.add('twoActive');
  //         allow.style.display = 'none';
  //         start.style.display = 'block';

  //         const video = document.querySelector('video');
  //         video.srcObject = mediaStream;
  //         video.onloadedmetadata = () => {
  //           // show the live video onto the screen
  //           video.play();
  //         };

  //         //?add listeners for saving video/audio
  //         // let start = document.getElementById('btnStart');
  //         // let stop = document.getElementById('btnStop');
  //         let mediaRecorder = new MediaRecorder(mediaStream);
  //         let chunks = [];

  //         start.addEventListener('click', () => {
  //           mediaRecorder.start();
  //           console.log(mediaRecorder.state);

  //           start.style.display = 'none';
  //           stop.style.display = 'block';
  //           chro.style.display = 'flex';
  //           chronometer((ref = { chro }));
  //         });

  //         stop.addEventListener('click', () => {
  //           mediaRecorder.stop();
  //           console.log(mediaRecorder.state);

  //           stop.style.display = 'none';
  //           uploadNewGifo.style.display = 'block';
  //           chro.style.display = 'none';
  //           repeatSnap.style.display = 'flex';
  //           middleContainer.innerHTML = '<video id="vid2" autoplay loop></video>';
  //         });

  //         repeatSnap.addEventListener('click', () => {
  //           middleContainer.innerHTML = '<video autoplay></video>';
  //           start.style.display = 'block';
  //           uploadNewGifo.style.display = 'none';
  //           repeatSnap.style.display = 'none';

  //           var video = document.querySelector('video');
  //           video.srcObject = mediaStream;
  //           video.onloadedmetadata = function (e) {
  //             // show the live video onto the screen
  //             video.play();
  //           };
  //         });

  //         mediaRecorder.ondataavailable = (ev) => {
  //           chunks.push(ev.data);
  //         };

  //         mediaRecorder.onstop = (ev) => {
  //           let vidSave = document.getElementById('vid2');
  //           // let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
  //           let blob = new Blob(chunks, { type: 'image/gif;' });
  //           chunks = [];
  //           let videoURL = window.URL.createObjectURL(blob);
  //           vidSave.src = videoURL;
  //           console.log(videoURL);
  //           console.log(vidSave);

  //           // mediaStream.getTracks().forEach(function(track) {
  //           //   track.stop();
  //           // });

  //           uploadNewGifo.addEventListener('click', () => {
  //             mediaStream.getTracks().forEach(function (track) {
  //               track.stop();
  //             });
  //             two.classList.remove('twoActive');
  //             three.classList.add('threeActive');
  //             repeatSnap.style.display = 'none';
  //           });
  //         };
  //       })
  //       .catch(function (err) {
  //         console.log(err.name + ': ' + err.message);
  //         alert('Algo paso con la camara');
  //       });
  //   });
  // }

  //chronometer function
  const chronometer = () => {
    var start = new Date().getTime();
    var now, elapsed, h, m, s, format;
    setInterval(function () {
      now = new Date().getTime();
      elapsed = now - start;
      h = Math.floor((elapsed % 86400000) / 3600000);
      m = Math.floor((elapsed % 3600000) / 60000);
      s = Math.floor((elapsed % 60000) / 1000);
      format = ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
      // chro.innerHTML = format;
      if (chro.current) chro.current.innerHTML = format;
    }, 1);
  };

  return (
    <>
      <Layout>
        <div className="containerCreateGifo mt-16 grid grid-cols-9 grid-rows-6 py-8">
          {/* <!-- <video id="vid2" controls></video> --> */}
          <div className="cameraArea col-start-2 col-end-5 row-start-2 row-end-3">
            <span className="camera col-start-2 col-end-3 row-start-2 row-end-3">a</span>
            <span className="cameraLight col-start-3 col-end-5 row-start-2 row-end-3">b</span>
          </div>
          {/* center container */}
          <div className="recordGifo col-start-3 col-end-8 row-start-1 row-end-5 ml-16 flex h-[390px] w-[688px] flex-col items-center justify-between border-2 border-solid border-violet-700 dark:border-gray-400">
            <div className="flex w-full flex-row items-center justify-between p-7 pb-0">
              <div className="topLeft h-[25px] w-[27px] border-l-2 border-t-2 border-solid border-green-400 dark:border-gray-400"></div>
              <div className="topRight h-[25px] w-[27px] border-r-2 border-t-2 border-solid border-green-400 dark:border-gray-400"></div>
            </div>
            <div
              className="middleContainer flex flex-col items-center justify-center dark:text-gray-200"
              ref={middleContainer}
            >
              <StartGifProcess />
              <AccessCamera />
            </div>
            <div className="flex w-full flex-row items-center justify-between p-7 pt-0">
              <div className="bottomRight h-[25px] w-[27px] border-b-2 border-l-2 border-solid border-green-400 dark:border-gray-400"></div>
              <div className="bottomLeft h-[25px] w-[27px] border-b-2 border-r-2 border-solid border-green-400 dark:border-gray-400"></div>
            </div>
          </div>
          <div className="bottomContainer col-start-5 col-end-8 row-start-5 row-end-5 ml-4 mr-12 flex flex-row items-center justify-between">
            <div className="steps flex justify-between gap-6">
              <span
                className="one w-7 rounded-full border-2 border-indigo-600 text-center text-indigo-600"
                ref={one}
              >
                1
              </span>
              <span
                className="two w-7 rounded-full border-2 border-indigo-600 text-center text-indigo-600"
                ref={two}
              >
                2
              </span>
              <span
                className="three w-7 rounded-full border-2 border-indigo-600 text-center text-indigo-600"
                ref={three}
              >
                3
              </span>
            </div>
            <div className="buttons">
              <span id="chro" className="chronometer" ref={chro}>
                c{/* {chronometer} */}
              </span>
              <div className="repeatSnapContainer" ref={repeatSnap}>
                <p className="repeatSnap font-bold text-violet-700 underline decoration-green-400 decoration-2 underline-offset-2 dark:text-gray-200">
                  REPETIR CAPTURA
                </p>
              </div>
            </div>
          </div>
          <span className="movie col-start-8 col-end-9 row-start-5 row-end-5 -mt-7">m</span>
          <span className="createGifoBar col-start-3 col-end-8 row-start-6 row-end-6 h-2 w-full rounded bg-indigo-600"></span>
          <div className="btnsContainer my- col-start-5 col-end-5 row-start-6 row-end-6 flex items-center justify-center">
            <span className="snap" ref={allow}>
              Comenzar
            </span>
            {/* <span className="snapNewGifo" ref={start} onClick={chronometer}>
              Grabar
            </span>
            <span className="stopNewGifo" ref={stop}>
              Finalizar
            </span>
            <span className="uploadNewGifo" ref={uploadNewGifo}>
              upload
            </span> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewGIF;
