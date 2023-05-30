import  { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/layoutContainer';
import { getFavoriteGifos } from '../services/services';
import Modal from '../components/modal/modal';

const content = {
  title: 'Favoritos',
  NoFavGifo: '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"',
};

const Favorites = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFavoriteGifos(favorites);
      setData(result.data);
    };
    fetchData();
  }
  , [favorites]);

  /*
  render favorite gifos in the favorites page using the data state but limits the number of gifos to 20
  render a loading spinner while the data is being fetched
  render a 'load more' button to fetch more gifos, only if the data state has more than 20 gifos
  */
  const renderGifos = () => {
    const gifos = data.slice(0, limit)
    return <LayoutContainer section={content.title} dataValue={gifos} noDataText={content.NoFavGifo} />;
  };

  const handleLoadMore = () => {
    setLimit(limit + 12);
  };

  const renderLoadMore = () => {
    if ( data.length > limit) {
      return (
        <div className="loadMore">
          <button className="btn btnLoadMore dark:text-gray-200" onClick={handleLoadMore}>
            Ver más
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <Layout>
        <Modal data={{data}} />
        {renderGifos()}
        <div className='flex flex-col items-center justify-center py-10'>
          {renderLoadMore()}
        </div>
        <Trending />
      </Layout>
    </>
  );
};

export default Favorites;
