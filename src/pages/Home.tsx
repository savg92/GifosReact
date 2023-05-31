import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/layoutContainer';
import { trendingTopics, getSearchGifos } from '../services/services';
import { useEffect, useState } from 'react';

const Home = ({ className }: { className: string }): JSX.Element => {
  const [dataTrending, setDataTrending] = useState<any[]>([]);
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const [topic, setTopic] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      const result = await trendingTopics();
      setDataTrending(result.data);
    };
    fetchData();
  }, []);

  // console.log(dataTrending);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSearchGifos(`${topic}`, limit, offset);
      setDataSearch(result.data);
    };
    fetchData();
  }
  , [limit, offset]);
  
  //handle search from a trending topic
  const handleSearch = async (topic: string) => {
    setTopic(topic);
    const result = await getSearchGifos(`${topic}`, limit, offset);
    setDataSearch(result.data);
    // console.log(result.data);
  };

  // render first 5 trending topics in the home page, including the comma and a blanck space at the end of each topic except the last one
  const renderTrending = () => {
    // function to UpperCase the first letter of the string
    const toUpperCase = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return dataTrending.slice(0, 5).map((item: any, index: number) => {
      return (
        <span key={index} className="trendingTopicItem cursor-pointer">
          <span className="hover:underline" onClick={() => handleSearch(toUpperCase(item))}>
            {toUpperCase(item)}
          </span>
          {index === 4 ? '' : ', '}
        </span>
      );
    });
  };

  const handleLoadMore = () => {
    setLimit(limit + 12);
  };

  const renderLoadMore = () => {
    if (dataSearch.length > limit-1) {
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
        <section className="content mt-0.5 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold dark:text-gray-200">
            Inspírate, busca, guarda, y crea los mejores <span>GIFOS</span>
          </h1>
          <div className="searchArea">
            <div className="searchBlockImg"></div>
            <div className="searchBar">
              <input
                type="text"
                className="searchInput"
                placeholder="Busca GIFOS y más"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => (e.key === 'Enter' ? handleSearch(topic) : '')}
              />
              <button className="searchBtn" type="submit">
                <div className="searchIcon" onClick={(e) => handleSearch(topic)}>
                  s
                </div>
              </button>
              <button className="searchCloseBtn">
                <div
                  className="searchCloseIcon"
                  onClick={() => {
                    setTopic('');
                    setDataSearch([]);
                    setLimit(12);
                  }}
                >
                  x
                </div>
              </button>
            </div>
          </div>
          <div className="trendingTopic text-center">
            <h3 className="text-xl font-bold dark:text-gray-200">Trending:</h3>
            <p className="dark:text-gray-200">{renderTrending()}</p>
          </div>
          {dataSearch.length !== 0 ? (
            <LayoutContainer
              section={topic}
              dataValue={dataSearch}
              noDataText="Intenta con otra búsqueda."
            />
          ) : (
            <span></span>
          )}
          <div className="flex flex-col items-center justify-center py-10">{renderLoadMore()}</div>
        </section>
        <Trending />
      </Layout>
    </>
  );
};

export default Home;
