import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import { getFavoriteGifos } from '../services/services';

const Favorites = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  let limit: number = 20;

  useEffect(() => {
    // console.log(data.length);
    if (favorites.length !== 0) {
      const fetchData = async () => {
        const result = await getFavoriteGifos(favorites);
        setData(result.data);
      };
      fetchData();
    } else {
      setData(favorites);
    }
  }, [favorites]);

  const renderFavorites = () => {
    return data
      .slice(0, limit)
      .map((gifo: any) => (
        <Gifo
          key={gifo.id}
          Id={gifo.id}
          images={gifo.images}
          title={gifo.title}
          username={gifo.username}
        />
      ));
  };

  const handleLoadMore = () => {
    limit += 20;
    // render();
    console.log(limit);

  };
  // create a function that init renderFavorites and handleLoadMore func
  const render = () => {
    renderFavorites();
  };

  return (
    <>
      <Layout>
        <h1 className="bg-green-500 text-3xl font-bold underline dark:bg-red-900">
          Hello world 2 vsdfds!
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.length === 0 ? (
            <div className="flex h-96 w-full justify-center">
              <p className="mt-8 text-center text-xl font-bold">No favorites at the moment</p>
            </div>
          ) : (
            <>
              {renderFavorites()}
              {data.length > 20 && (
                <div className="flex w-full justify-center">
                  <button
                    className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Favorites;
