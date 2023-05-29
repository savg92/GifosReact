import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/layoutContainer';
import { getFavoriteGifos } from '../services/services';

const content = {
  title: 'Mis GIFOS',
  NoFavGifo: '¡Anímate a crear tu primer GIFO!',
};

const MyGIF = () => {
  const [data, setData] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const MyGif = JSON.parse(localStorage.getItem('MyGif') || '[]');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFavoriteGifos(MyGif);
      setData(result.data);
    };
    fetchData();
  }, [MyGif]);

  /*
  render favorite gifos in the favorites page using the data state but limits the number of gifos to 20
  render a loading spinner while the data is being fetched
  render a 'load more' button to fetch more gifos, only if the data state has more than 20 gifos
  */
  const renderGifos = () => {
    const gifos = data.slice(0, limit);
    return (
      <LayoutContainer section={content.title} dataValue={gifos} noDataText={content.NoFavGifo} />
    );
  };

  const handleLoadMore = () => {
    setLimit(limit + 12);
  };

  const renderLoadMore = () => {
    if (data.length > limit) {
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
        <div className="flex flex-col items-center justify-center py-10">{renderLoadMore()}</div>
        <Trending />
      </Layout>
    </>
  );
};

export default MyGIF;
