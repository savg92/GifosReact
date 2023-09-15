import { useState, useRef, useCallback } from 'react';
import { createGifo } from '../../services/services';
import Webcam from 'react-webcam';
import AccessCamera from './AccessCamera';
import StartGifProcess from './StartGifProcess';
import  Stopwatch  from '../../handlers//stopWatch';

import loader from '../../assets/loader.svg';
import movie from '../../assets/pelicula.svg';
import camera from '../../assets/camara.svg';
import cameraLight from '../../assets/element-luz-camara.svg';
import check from '../../assets/check.svg';
import downloadBtnIcon from '../../assets/icon-download-hover.svg';
import linkIcon from '../../assets/icon-link-hover.svg';

const NewGifoContainer = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [step, setStep] = useState<number>(0);

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
    setTimeout(() => {
      // check if the user has a camera
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('No camera found');
      } else {
        setStep(2);
        allow.current?.classList.add('hidden');
        start.current?.classList.remove('hidden');
      }
    }, 1000);
  };

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
    setStep(3);
    // check on browser compatibility for mp4 and webm
    const formats = ['video/webm', 'video/mp4'];
    let format = '';
    if (navigator.userAgent.includes('Safari')) {
      format = formats[1];
    }
    if(navigator.userAgent.includes('Firefox')){
      format = formats[1];
    }
    if(navigator.userAgent.includes('Chrome')){
      format = formats[0];
    }

    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: format,
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
    start.current?.classList.add('hidden');
    stop.current?.classList.remove('hidden');
  }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop();
    stop.current?.classList.add('hidden');
    repeatSnap.current?.classList.remove('hidden');
    uploadNewGifo.current?.classList.remove('hidden');
    chro.current?.classList.add('hidden');
    setStep(4);
  }, [mediaRecorderRef]);

  const handleUpload = useCallback(async () => {
    if (recordedChunks.length) {
      const file = new Blob(recordedChunks, { type: 'image/gif' });
      setStep(5);
      repeatSnap.current?.classList.add('hidden');
      uploadNewGifo.current?.classList.add('hidden');
      try {
        const gifo = await createGifo(file);
        console.log(gifo);
        setStep(6);
      } catch (error) {
        console.error('API request failed with error:', error);
      }
    }
  }, [recordedChunks]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        // type: 'video/mp4',
        type: 'gif',
      });
      const url = URL.createObjectURL(blob);
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.classList.add('hidden');
      element.href = url;
      element.download = 'Gifos.gif';
      element.click();
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
        <div className="cameraArea col-start-2 col-end-5 row-start-2 row-end-4 flex">
          <img src={camera} alt="camera" className="" />
          <img src={cameraLight} alt="cameraLight" className=" h-5/6 pt-10" />
        </div>

        {/* center container */}
        <div className="recordGifo col-start-3 col-end-8 row-start-1 row-end-5 ml-16 flex h-[390px] w-[688px] flex-col items-center justify-between border-2 border-solid border-violet-700 dark:border-gray-400">
          <div className="flex w-full flex-row items-center justify-between p-7 pb-0">
            <div className="topLeft h-[25px] w-[27px] border-l-2 border-t-2 border-solid border-green-400 dark:border-gray-400"></div>
            <div className="topRight h-[25px] w-[27px] border-r-2 border-t-2 border-solid border-green-400 dark:border-gray-400"></div>
          </div>
          <div
            className="middleContainer -my-3 flex flex-col items-center justify-center dark:text-gray-200 "
            ref={middleContainer}
          >
            {step === 0 && <StartGifProcess />}
            {step == 1 && <AccessCamera />}
            {(step == 2 || step == 3) && (
              <Webcam
                width={420}
                audio={false}
                mirrored={true}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                autoPlay
              />
            )}
            {step === 4 && recordedChunks.length > 0 && (
              <div>
                <video
                  className="w-[400px] scale-x-[-1] transform"
                  src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/mp4' }))}
                  autoPlay
                  loop
                />
              </div>
            )}
            {step === 5 && (
              <div className="absolute box-border flex w-96 flex-1 flex-col justify-between bg-violet-700 opacity-90">
                <video
                  className="scale-x-[-1] transform opacity-40"
                  src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/mp4' }))}
                  autoPlay
                  loop
                />
                <div className="absolute inset-0 flex flex-col items-center ">
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <img
                      src={loader}
                      alt="loader"
                      className="w-6 rotate-180 animate-spin transition duration-1000 ease-in-out"
                    />
                    <span className="text-xl font-bold text-white">Estamos subiendo tu GIFO</span>
                  </div>
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="absolute box-border flex w-96 flex-1 flex-col justify-between bg-violet-700 opacity-90">
                <video
                  className="scale-x-[-1] transform opacity-40"
                  src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/mp4' }))}
                  autoPlay
                  loop
                />
                <div className="absolute inset-0 flex flex-col items-center ">
                  <div className="flex w-full justify-end gap-3 p-3 align-top">
                    <button
                      className="h-8 w-8 cursor-pointer"
                      title="Descargar"
                      // onClick={() => blobDwnld(images.original.url, title)}
                    >
                      <img
                        src={downloadBtnIcon}
                        alt="download"
                        className="opacity-70 hover:opacity-100"
                      />
                    </button>
                    <button
                      className="h-8 w-8 cursor-pointer"
                      title="Obtener enlace"
                      // onClick={() => blobDwnld(images.original.url, title)}
                    >
                      <img
                        src={linkIcon}
                        alt="link"
                        className="opacity-70 hover:opacity-100"
                      />
                    </button>
                  </div>
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <img src={check} alt="check" className="w-6" />
                    <span className="text-xl font-bold text-white">GIFO subido con éxito</span>
                  </div>
                </div>
              </div>
            )}
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
            {step === 3 && (
              <span
                id="chro"
                className="chronometer font-bold text-violet-700  dark:text-gray-200"
                ref={chro}
              >
                <Stopwatch />
              </span>
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
        <span className="movie col-start-8 col-end-9 row-start-5 row-end-5 -mt-7">
          <img src={movie} alt="movie" />
        </span>
        <span className="createGifoBar col-start-3 col-end-8 row-start-6 row-end-6 h-2 w-full rounded bg-indigo-600"></span>
        <div className="btnsContainer my- col-start-5 col-end-5 row-start-6 row-end-6 flex items-center justify-center">
          <button
            className="snap h-12 w-60 rounded-full border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
            ref={allow}
            onClick={handleAllow}
          >
            COMENZAR
          </button>
          <button
            className="snapNewGifo hidden h-12 w-60 rounded-full border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
            ref={start}
            onClick={handleStartCaptureClick}
          >
            GRABAR
          </button>
          <button
            className="stopNewGifo hidden h-12 w-60 rounded-full border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
            ref={stop}
            onClick={handleStopCaptureClick}
          >
            FINALIZAR
          </button>
          <button
            className="uploadNewGifo hidden h-12 w-60 rounded-full border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
            ref={uploadNewGifo}
            onClick={handleUpload}
          >
            SUBIR GIFO
          </button>
        </div>
      </div>
    </>
  );
};

export default NewGifoContainer;