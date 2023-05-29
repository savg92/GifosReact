import React from 'react';
import Layout from '../components/layout/layout';

const NewGIF = () => {
  return (
    <>
      <Layout>
        <div className="containerCreateGifo">
            {/* <!-- <video id="vid2" controls></video> --> */}
            <div className="cameraArea">
                <span className="camera"></span>
                <span className="cameraLight"></span>
            </div>
            <div className="recordGifo">
                <div className="topLeft"></div>
                <div className="topRight"></div>
                <div className="middleContainer">
                    <p className="createGifoTitle">
                        Aquí podrás <br></br> crear tus propios <span className="createGifoTitleSpan">GIFOS</span>
                    </p>
                    <p className="createGifoText">¡Crea tu GIFO en sólo 3 pasos!</p>
                    <p className="createGifoText">(sólo necesitas una cámara para grabar un video)</p>
                </div>
                <div className="bottomRight"></div>
                <div className="bottomLeft"></div>
            </div>
            <div className="steps">
                <span className="one"></span>
                <span className="two"></span>
                <span className="three"></span>
            </div>
            <span id="chro" className="chronometer"></span>
            <div className="repeatSnapContainer">
                <p className="repeatSnap">REPETIR CAPTURA</p>
            </div>
            <span className="movie"></span>
            <span className="createGifoBar"></span>
            <span className="snap"></span>
            <span className="snapNewGifo"></span>
            <span className="stopNewGifo"></span>
            <span className="uploadNewGifo"></span>
          </div>
      </Layout>
    </>
  );
};

export default NewGIF;
