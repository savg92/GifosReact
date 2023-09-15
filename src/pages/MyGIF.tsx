import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/LayoutContainer';
import { getFavoriteGifos } from '../services/services';

import NoMyGifo from '../assets/icon-mis-gifos-sin-contenido.svg';
import sectionIcon from '../assets/icon-mis-gifos.svg';

const content = {
  icon: sectionIcon,
  title: 'Mis GIFOS',
  NoMyGifo: '¡Anímate a crear tu primer GIFO!',
  NoMyGifoImg: NoMyGifo,
};

const MyGIF = () => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const MyGif = JSON.parse(localStorage.getItem('MyGif') || '[]');

  useEffect(() => {
    const controller = new AbortController();
    if (MyGif.length !== 0) {
      getFavoriteGifos(MyGif, controller.signal).then((result) => {
        setData(result.data);
      });
    }
    return () => {
      controller.abort();
    };
  }, [MyGif]);

  /*
  render favorite gifos in the favorites page using the data state but limits the number of gifos to 20
  render a loading spinner while the data is being fetched
  render a 'load more' button to fetch more gifos, only if the data state has more than 20 gifos
  */
  const renderGifos = () => {
    const gifos = data.slice(0, limit);
    return (
      <LayoutContainer
        sectionIcon={content.icon}
        section={content.title}
        dataValue={gifos}
        noDataText={content.NoMyGifo}
        noDataImg={content.NoMyGifoImg}
      />
    );
  };

  const handleLoadMore = () => {
    setLimit(limit + 12);
  };

  const renderLoadMore = () => {
    if (data.length > limit) {
      return (
        <div className="loadMore">
          <button
            className="btn btnLoadMore h-12 w-60 rounded-full border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
            onClick={handleLoadMore}
          >
            Ver más
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <Layout>
        {renderGifos()}
        <div className="flex flex-col items-center justify-center py-10">{renderLoadMore()}</div>
        <Trending />
      </Layout>
    </>
  );
};

export default MyGIF;
