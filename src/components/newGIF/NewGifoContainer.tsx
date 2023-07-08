import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import AccessCamera from './AccessCamera';
import StartGifProcess from './StartGifProcess';

const NewGifoContainer = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [step, setStep] = useState<number>(0);
  const [allowCamera, setAllowCamera] = useState<boolean>(false);

  const allow = useRef<HTMLButtonElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const stop = useRef<HTMLButtonElement>(null);
  const uploadNewGifo = useRef<HTMLButtonElement>(null);
  const middleContainer = useRef<HTMLDivElement>(null);
  const one = useRef<HTMLButtonElement>(null);
  const two = useRef<HTMLButtonElement>(null);
  const three = useRef<HTMLButtonElement>(null);
  const chro = useRef<HTMLButtonElement>(null);
  const repeatSnap = useRef<HTMLDivElement>(null);

  const handleAllow = () => {
    setStep(1);
    console.log(step);
    setTimeout(() => {
      // check if the user has a camera
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('No camera found');
        setAllowCamera(false);
      } else {
        setStep(2);
        console.log(step);
        allow.current?.classList.add('hidden');
        start.current?.classList.remove('hidden');
      }
    }, 1000);
  };

  //chronometer function
  const chronometer = () => {
    var start = new Date().getTime();
    var now, elapsed, hh, mm, ss, format;
    setInterval(function () {
      now = new Date().getTime();
      elapsed = now - start;
      hh = Math.floor((elapsed % 86400000) / 3600000);
      mm = Math.floor((elapsed % 3600000) / 60000);
      ss = Math.floor((elapsed % 60000) / 1000);
      format = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2);
      // chro.innerHTML = format;
      if (chro.current) chro.current.innerHTML = format;
    }, 1);
  };

  /* 
    on click button ref={start}
    start recording video
    hide button ref={start}
    show ref={chro} and start chronometer
    show button ref={stop}, on click stop recording and stop chronometer
    play video on screen ref={middleContainer}
    show button ref={repeatSnap}, on click repeat recording
    show button ref={uploadNewGifo}, on click upload gifo
  */
  // const handleStart = () => {
  //   start.current?.classList.add('hidden');
  //   chro.current?.classList.remove('hidden');
  //   stop.current?.classList.remove('hidden');
  //   chronometer();
  //   const video = document.getElementById('vid2') as HTMLVideoElement;
  //   const mediaRecorder = new MediaRecorder(video.srcObject as MediaStream);
  //   mediaRecorder.start();
  //   console.log(mediaRecorder.state);
  //   console.log('recorder started');
  //   let chunks: Blob[] = [];
  //   mediaRecorder.ondataavailable = function (e) {
  //     chunks.push(e.data);
  //   };
  //   mediaRecorder.onstop = function (e) {
  //     console.log('recorder stopped');
  //     const blob = new Blob(chunks, { type: 'video/mp4' });
  //     chunks = [];
  //     const videoURL = window.URL.createObjectURL(blob);
  //     video.src = videoURL;
  //   };
  //   stop.current?.addEventListener('click', () => {
  //     mediaRecorder.stop();
  //     console.log(mediaRecorder.state);
  //     console.log('recorder stopped');
  //     stop.current?.classList.add('hidden');
  //     repeatSnap.current?.classList.remove('hidden');
  //     uploadNewGifo.current?.classList.remove('hidden');
  //     chro.current?.classList.add('hidden');
  //     // remove element with id="vid2"
  //     const video = document.getElementById('vid2') as HTMLVideoElement;

  //     video.remove();
  //   });
  //   // play recorded video on screen ref={middleContainer}
  //   video.play();

  // };

  const handleRepeat = () => {
    repeatSnap.current?.classList.add('hidden');
    uploadNewGifo.current?.classList.add('hidden');
    start.current?.classList.remove('hidden');
    setStep(2);
    setRecordedChunks([]);
  };

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
    start.current?.classList.add('hidden');
    chro.current?.classList.remove('hidden');
    stop.current?.classList.remove('hidden');
    chronometer();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setCapturing(false);
    stop.current?.classList.add('hidden');
    repeatSnap.current?.classList.remove('hidden');
    uploadNewGifo.current?.classList.remove('hidden');
    chro.current?.classList.add('hidden');
    console.log(recordedChunks);
    setStep(3);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.classList.add('hidden');
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: 480,
    height: 320,
    facingMode: 'user',
  };

  return (
    <>
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
            className="middleContainer -my-3 flex flex-col items-center justify-center dark:text-gray-200"
            ref={middleContainer}
          >
            {step === 0 && <StartGifProcess />}
            {step == 1 && <AccessCamera />}
            {step == 2 && (
              <Webcam
                width={420}
                audio={false}
                mirrored={true}
                ref={webcamRef}
                videoConstraints={videoConstraints}
              />
            )}
            {
              // show blob video in recordedChunks state if step is 3 and recordedChunks is not empty
              step === 3 && recordedChunks.length > 0 && (
                <video
                  className="w-[400px]"
                  src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/mp4' }))}
                  autoPlay
                  loop
                />
              )
            }
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
            {step === 2 && (
              <span
                id="chro"
                className="chronometer hidden font-bold text-violet-700  dark:text-gray-200"
                ref={chro}
              ></span>
            )}
            <div className="repeatSnapContainer hidden" ref={repeatSnap}>
              <button
                className="repeatSnap font-bold text-violet-700 underline decoration-green-400 decoration-2 underline-offset-2 dark:text-gray-200"
                onClick={handleRepeat}
              >
                REPETIR CAPTURA
              </button>
            </div>
          </div>
        </div>
        <span className="movie col-start-8 col-end-9 row-start-5 row-end-5 -mt-7">m</span>
        <span className="createGifoBar col-start-3 col-end-8 row-start-6 row-end-6 h-2 w-full rounded bg-indigo-600"></span>
        <div className="btnsContainer my- col-start-5 col-end-5 row-start-6 row-end-6 flex items-center justify-center">
          <button className="snap" ref={allow} onClick={handleAllow}>
            Comenzar
          </button>
          <button className="snapNewGifo hidden" ref={start} onClick={handleStartCaptureClick}>
            Grabar
          </button>
          <button className="stopNewGifo hidden" ref={stop} onClick={handleStopCaptureClick}>
            Finalizar
          </button>
          <button className="uploadNewGifo hidden" ref={uploadNewGifo}>
            upload
          </button>
        </div>
        <button onClick={() => console.log(step, recordedChunks)}>asd</button>
      </div>
    </>
  );
};

export default NewGifoContainer;
