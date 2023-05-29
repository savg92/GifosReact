import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending from '../components/trending/trending';
import LayoutContainer from '../components/layoutContainer/layoutContainer';
import { trendingTopics, getSearchGifos } from '../services/services';
import { useEffect, useState } from 'react';

const Home = ({ className }: { className: string }): JSX.Element => {
  const [dataTrending, setDataTrending] = useState<any[]>([]);
  const [dataSearch, setDataSearch] = useState<any[]>();
  const [topic, setTopic] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  useEffect(() => {
    const fetchData = async () => {
      const result = await trendingTopics();
      setDataTrending(result.data);
    };
    fetchData();
  }, []);

  // console.log(dataTrending);


  //handle search from a trending topic
  const handleSearch = async (topic: string) => {
    setTopic(topic);
    const result = await getSearchGifos(`${topic}`, limit, offset);
    setDataSearch(result.data);
    console.log(result.data);
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
          <span className="hover:underline" onClick={() => handleSearch(toUpperCase(item))}>
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
            <div className="searchBar">
              <input
                type="text"
                className="searchInput"
                placeholder="Busca GIFOS y más"
                onChange=
                {(e) => handleSearch(e.target.value)}
                // {(e) => console.log(e.target.value)}
                // {(e) => {
                //   {topic === '' ? setTopic(e.target.value) : setTopic(topic)}
                // }}
                value={topic}
              />
              
            </div>
          </div>
          <div className="trendingTopic text-center">
            <h3 className="text-xl font-bold dark:text-gray-200">Trending:</h3>
            <p className="dark:text-gray-200">{renderTrending()}</p>
          </div>
          {/* <div className="mainGifContainer">
            <span className="barTrend"></span>
            <h2 className="searchedTopic">Mascotas</h2>
            <div className="slider gifContainer"></div>
            <span className="moreGif"></span>
          </div> */}
          <LayoutContainer
            section={topic}
            dataValue={dataSearch}
            noDataText="Intenta con otra búsqueda."
          />
        </section>
        <Trending />
      </Layout>
    </>
  );
};

export default Home;
