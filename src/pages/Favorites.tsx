import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/LayoutContainer';
import { getMultipleGifos } from '../services/services';
import { renderLoadMore } from '..//handlers/renderLoadMore';

import noFavorites from '../assets/icon-fav-sin-contenido.svg';
import sectionIcon from '../assets/icon-favoritos.svg';

const content = {
  icon: sectionIcon,
  title: 'Favoritos',
  NoFavGifo: '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"',
  NoFavImg: noFavorites,
};

const Favorites = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const [gifos, setGifos] = useState<any[]>([]);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  useEffect(() => {
    const controller = new AbortController();
    if (favorites.length !== 0) {
      getMultipleGifos(favorites, controller.signal).then((result) => {
        setData(result.data);
      });
    }
    return () => {
      controller.abort();
    }
  }, [favorites]);

  useEffect(() => {
    const gifos = data.slice(0, limit);
    setGifos(gifos);
  }, [data, limit]);

  return (
    <>
      <Layout>
        {/* {data.length === 0 ? (
        // <LayoutContainer
        //   sectionIcon={content.icon}
        //   section={content.title}
        //   dataValue={gifos}
        //   noDataText={content.NoFavGifo}
        //   noDataImg={content.NoFavImg}
        // />
        <h1>Hola</h1>
        ) : (
          <LayoutContainer
            sectionIcon={content.icon}
            section={content.title}
            dataValue={gifos}
            noDataText={content.NoFavGifo}
            noDataImg={content.NoFavImg}
          />
        )} */}
        <LayoutContainer
          sectionIcon={content.icon}
          section={content.title}
          dataValue={gifos}
          noDataText={content.NoFavGifo}
          noDataImg={content.NoFavImg}
        />
        <div className="flex flex-col items-center justify-center py-10">
          {renderLoadMore(limit, setLimit, data)}
        </div>
        <Trending />
      </Layout>
    </>
  );
};

export default Favorites;
