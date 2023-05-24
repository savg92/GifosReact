import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';

const MyGIF = () => {
  return (
    <>
      <Layout>
        <section className="contentMygifos mt-0.5">
          <div className="flex flex-col items-center justify-center pb-8 text-xl font-bold dark:text-gray-200">
            <span className="barTrend"></span>
            <h1 className="searchedTopic">Mis GIFOS</h1>
            <div className="gifContainer">
              {/* <!-- <div className="middleContainer">
                        <span className="noMyGifo"></span>
                        <p className="noMyGifoTitle">
                            ¡Anímate a crear tu primer GIFO!
                        </p>
                    </div> --> */}
            </div>
            {/* <!-- <div className="slider gifContainer"></div> --> */}
            <span className="moreGif"></span>
          </div>
        </section>
        <Trending />
      </Layout>
    </>
  );
};

export default MyGIF;
