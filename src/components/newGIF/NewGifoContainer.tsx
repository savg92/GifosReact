import { useState, useRef, useCallback } from 'react';
import { createGifo } from '../../services/services';
import Webcam from 'react-webcam';
import AccessCamera from './AccessCamera';
import StartGifProcess from './StartGifProcess';

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
    // check on browser compatibility for mp4 and webm
    const formats = ['video/webm', 'video/mp4'];
    let format = '';
    navigator.userAgent.includes('Safari') ? (format = formats[1]) : (format = formats[0]);
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: format,
        // mimeType: 'image/gif'
      });
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: format,
        // mimeType: 'image/gif'
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
    start.current?.classList.add('hidden');
    chro.current?.classList.remove('hidden');
    stop.current?.classList.remove('hidden');
    chronometer();
  }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop();
    stop.current?.classList.add('hidden');
    repeatSnap.current?.classList.remove('hidden');
    uploadNewGifo.current?.classList.remove('hidden');
    chro.current?.classList.add('hidden');
    setStep(3);
  }, [mediaRecorderRef]);

  // upload new gifo to giphy as a blob
  const handleUpload = useCallback(async () => {
    if (recordedChunks.length > 0) {
      setStep(4);
      repeatSnap.current?.classList.add('hidden');
      uploadNewGifo.current?.classList.add('hidden');
      try {
        /*
          tries to fetch
          while there is a response, sets step 4, hiddes buton repeatSnap and uploadNewGifo
          once there is a successfull response, it sets step 5
        */
        const response = await createGifo(recordedChunks[0]);
        if (response) {
          setStep(5);
        }

      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          console.error('API request failed with 403 Forbidden error:', error.response.data);
          // handle 403 Forbidden error
        } else {
          console.error('API request failed with error:', error);
          // handle other errors
        }
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
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.classList.add('hidden');
      a.href = url;
      a.download = 'Gifos.gif';
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
            className="middleContainer -my-3 flex flex-col items-center justify-center dark:text-gray-200 "
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
                autoPlay
              />
            )}
            {step === 3 && recordedChunks.length > 0 && (
              <div>
                <video
                  className="w-[400px] scale-x-[-1] transform"
                  src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/mp4' }))}
                  autoPlay
                  loop
                />
              </div>
            )}
            {step === 4 && (
              <div className="absolute box-border flex w-96 flex-1 flex-col justify-between bg-violet-700 opacity-90">
                <video
                  className="scale-x-[-1] transform opacity-40"
                  src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/mp4' }))}
                  autoPlay
                  loop
                />
                <div className="absolute inset-0 flex flex-col items-center ">
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <span className="loading">loading</span>
                    <span className="text-xl font-bold text-white">Estamos subiendo tu GIFO</span>
                  </div>
                </div>
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
                  <div className="flex w-full justify-end gap-3 p-3 align-top">
                    <button
                      className="h-8 w-8 cursor-pointer"
                      title="Descargar"
                      onClick={handleDownload}
                    >
                      D
                    </button>
                    <button className="h-8 w-8 cursor-pointer" title="Obtener link">
                      L
                    </button>
                  </div>
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <span className="checkMark">check mark</span>
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
          <button className="uploadNewGifo hidden" ref={uploadNewGifo} onClick={handleUpload}>
            upload
          </button>
        </div>
        <button onClick={() => console.log(step, recordedChunks[0].arrayBuffer())}>asd</button>
      </div>
    </>
  );
};

export default NewGifoContainer;
