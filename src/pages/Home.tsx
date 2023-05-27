import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending from '../components/trending/trending';
import { trendingTopics, getSearchGifos } from '../services/services';
import { useEffect, useState } from 'react';

const Home = ({ className }: { className: string }): JSX.Element => {
  const [dataTrending, setDataTrending] = useState<any[]>([]);
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  useEffect(() => {
    const fetchData = async () => {
      const result = await trendingTopics();
      setDataTrending(result.data);
    };
    fetchData();
  }, []);

  console.log(dataTrending);

  // render the search results
  const renderSearch = () => {
    if (dataSearch.length === 0) {
      return (
        <div className="flex h-96 w-full justify-center">
          <p className="mt-8 text-center text-xl font-bold">No results found</p>
        </div>
      );
    }
    return dataSearch.slice(0, limit).map((item: any, index: number) => {
      const { id, images, title, username } = item;
      return <Gifo key={index} Id={id} images={images} title={title} username={username} />;
    });
  };

  //handle search from a trending topic
  const handleSearch = async (topic: string) => {
    setSearch(topic);
    const result = await getSearchGifos(topic, offset, limit);
    setDataSearch(result.data);
    
  };

  // render first 5 trending topics in the home page, including the comma and a blanck space at the end of each topic except the last one
  const renderTrending = () => {
    // function to UpperCase the first letter of the string
    const toUpperCase = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return dataTrending.slice(0, 5).map((item: any, index: number) => {
      return (
        <span key={index} className="trendingTopicItem">
          <span className="hover:underline" onClick={() => handleSearch(item)}>
            {toUpperCase(item)}
          </span>
          {index === 4 ? '' : ', '}
        </span>
      );
    });
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
            <div className="searchBar">searchBar</div>
          </div>
          <div className="trendingTopic text-center">
            <h3 className="text-xl font-bold dark:text-gray-200">Trending:</h3>
            <p className="dark:text-gray-200">{renderTrending()}</p>
          </div>
          <div className="mainGifContainer">
            <span className="barTrend"></span>
            <h2 className="searchedTopic">Mascotas</h2>
            <div className="slider gifContainer"></div>
            <span className="moreGif"></span>
          </div>
        </section>
        <Trending />
      </Layout>
    </>
  );
};

export default Home;
