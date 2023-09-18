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
  const [gifos, setGifos] = useState<any>([]);
  const localData = JSON.parse(localStorage.getItem('MyGif') || '[]');

  useEffect(() => {
    const controller = new AbortController();
    if (localData.length !== 0) {
      getMultipleGifos(localData, controller.signal).then((result) => {
        setData(result.data);
      });
    }
    return () => {
      controller.abort();
    };
  }, [localData]);
  
  useEffect(() => {
    const gifos = data.slice(0, limit);
    setGifos(gifos);
  }, [data, limit]);

  useEffect(() => {
    if (localData.length === 0) {
      setData([]);
      setGifos([]);
      setLimit(12);
    }
  }, [localData]);

  return (
    <>
      <Layout>
        {localData.length === 0 ? (
          <LayoutContainer
            sectionIcon={content.icon}
            section={content.title}
            dataValue={gifos}
            noDataText={content.NoMyGifo}
            noDataImg={content.NoMyGifoImg}
          />
        ) : (
          <LayoutContainer
            sectionIcon={content.icon}
            section={content.title}
            dataValue={gifos}
            noDataText={content.NoMyGifo}
            noDataImg={content.NoMyGifoImg}
          />
        )}
        {renderLoadMore(limit, setLimit, data)}
        <Trending />
      </Layout>
    </>
  );
};

export default MyGIF;
