import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/layoutContainer';
import { getFavoriteGifos } from '../services/services';
import { title } from 'process';

const content = {
  title: 'Favoritos',
  NoFavGifo: '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"',
};

const Favorites = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  console.log(data);

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
        {renderGifos()}
        <div className='flex flex-col items-center justify-center'>
          {renderLoadMore()}
        </div>
        <Trending />
      </Layout>
    </>
  );
};

export default Favorites;
