import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/LayoutContainer';
import { getFavoriteGifos } from '../services/services';
// import Modal from '../components/modal/modal';
import Modal from '../components/layoutContainer/Modal';

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
    const fetchData = async () => {
      if (favorites.length !== 0) {
        const result = await getFavoriteGifos(favorites);
        return setData(result.data);
      }
    };
    fetchData();
  }, [favorites]);

  useEffect(() => {
    const gifos = data.slice(0, limit);
    setGifos(gifos);
  }, [data, limit]);

  /*
  render favorite gifos in the favorites page using the data state but limits the number of gifos to 20
  render a loading spinner while the data is being fetched
  render a 'load more' button to fetch more gifos, only if the data state has more than 20 gifos
  */
  // let gifos = data.slice(0, limit);

  // const renderGifos = () => {
  //   const gifos = data.slice(0, limit)
  //   return <LayoutContainer sectionIcon={content.icon} section={content.title} dataValue={gifos} noDataText={content.NoFavGifo}  noDataImg={content.NoFavImg} />;
  // };

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

        {/* {renderGifos()} */}
        {/* <LayoutContainer sectionIcon={content.icon} section={content.title} dataValue={gifos} noDataText={content.NoFavGifo}  noDataImg={content.NoFavImg} /> */}

        {/* // render LayoutContainer component and re render it when the data state changes */}

        <LayoutContainer
          sectionIcon={content.icon}
          section={content.title}
          dataValue={gifos}
          noDataText={content.NoFavGifo}
          noDataImg={content.NoFavImg}
        />

        <div className="flex flex-col items-center justify-center py-10">{renderLoadMore()}</div>
        <Trending />
      </Layout>
    </>
  );
};

export default Favorites;
