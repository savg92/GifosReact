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
  const [limit, setLimit] = useState<number>(20);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  const a = document.querySelector('#favContainer');

  useEffect(() => {
    // console.log(data.length);
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
    });
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
        {/* <section className="contentFavourites mt-0.5">
          <div
            className="flex flex-col items-center justify-center pb-8 text-xl font-bold dark:text-gray-200"
            id="mainGifContainerFav"
          >
            <span className="barTrend"></span>
            <h1 className="searchedTopic">{content.title}</h1>
            {/* <div className="gifContainer"></div> */}
            {/* <!-- <span className="moreGif"></span> -->
                    <!-- <span className="reload">dfs</span> --> */}
          {/* </div>
        </section> */}
        {/* <div className="flex flex-wrap justify-center">
          {data.length === 0 ? (
            // <div className="col-start-2 col-end-4 flex h-96 w-full justify-center">
            <div className="flex h-96 w-full justify-center">
              <span className="noGif"></span>
              <p className="mt-8 w-96 text-center text-xl font-bold dark:text-gray-200">
                {content.NoFavGifo}
              </p>
            </div>
          ) : (
            <>
              <div
                id="favContainer"
                className="flex w-full flex-wrap justify-center gap-8 py-3 md:px-12"
              >
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
              </div>
            </>
          )}
        </div> */}
        <LayoutContainer section={content.title} dataValue={data} noDataText={content.NoFavGifo} />
        <Trending />
      </Layout>
    </>
  );
};

export default Favorites;
