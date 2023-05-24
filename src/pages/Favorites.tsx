import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import { getFavoriteGifos } from '../services/services';

const Favorites = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  const a = document.querySelector('#favContainer');

  const limit: number = 20;
  
  useEffect(() => {
    console.log(data.length);
    if (favorites.length !== 0) {
      const fetchData = async () => {
        const result = await getFavoriteGifos(favorites);
        setData(result.data);
      };
      fetchData();
      render();
    } else {
      setData(favorites);
    }
  }, [favorites]);

  
  const render = () => {
    let limit: number = 20;
    if (data.length > 20) {
      limit = 20;
    } else {
      limit = data.length;
    }
    return data.slice(0, limit).map((item: any, index: number) => {
      const { id, images, title, username } = item;
      return <Gifo key={index} Id={id} images={images} title={title} username={username} />;
    }
    );
  };

  const renderFavorites = () => {
    if (data.length === 0) {
      return (
        <div className="flex h-96 w-full justify-center">
          <p className="mt-8 text-center text-xl font-bold">No favorites at the moment</p>
        </div>
      );
    }
    return render();
  };

  const handleLoadMore = () => {
    let limit: number = 20;
    if (data.length > 20) {
      limit = 20;
    } else {
      limit = data.length;
    }
    setData(data.slice(0, limit + 20));
  };

  useEffect(() => {
    render();
  }, [a]);


  return (
    <>
      <Layout>
        <h1 className="bg-green-500 text-3xl font-bold underline dark:bg-red-900">
          Hello world 2 vsdfds!
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.length === 0 ? (
            <div className="flex h-96 w-full justify-center">
              <span className="noGif"></span>
              <p className="noGifoTitle">
                "¡Guarda tu primer GIFO en Favoritos <br></br>
                para que se muestre aquí!"
              </p>
            </div>
          ) : (
            <>
              <div id="favContainer" className="flex w-full flex-wrap justify-center"></div>
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
