import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/LayoutContainer';
import { getMultipleGifos } from '../services/services';
import { renderLoadMore } from '..//handlers/renderLoadMore';

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
      getMultipleGifos(MyGif, controller.signal).then((result) => {
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

  return (
    <>
      <Layout>
        {renderGifos()}
        <div className="flex flex-col items-center justify-center py-10">
          {renderLoadMore(limit, setLimit, data)}
        </div>
        <Trending />
      </Layout>
    </>
  );
};

export default MyGIF;
