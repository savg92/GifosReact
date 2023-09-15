import LayoutContainer from '../layoutContainer/LayoutContainer';
import { trendingTopics, getSearchGifos, autoSuggest } from '../../services/services';
import { useEffect, useState } from 'react';
import { renderLoadMore } from '../../handlers/renderLoadMore';

import headerLogo from '../../assets/ilustra_header.svg';
import searchNoResultIcon from '../../assets/icon-busqueda-sin-resultado.svg';

const SearchGifo: React.FC = (): JSX.Element => {
  const [dataTrending, setDataTrending] = useState<any[]>([]);
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const [dataSuggest, setDataSuggest] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      if (topic.length !== 0) {
        const result = await getSearchGifos(`${topic}`, limit, offset);
        return setDataSearch(result.data);
      }
    };
    fetchData();
  }, [limit, offset]);

  useEffect(() => {
    const fetchData = async () => {
      if (topic.length !== 0) {
        const result = await autoSuggest(`${topic}`);
        return setDataSuggest(result.data);
      }
    };
    fetchData();
  }, [topic]);

  //handle search from a trending topic
  const handleSearch = async (topic: string): Promise<void> => {
    setTopic(topic);
    const result = await getSearchGifos(`${topic}`, limit, offset);
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
        <span
          key={index}
          className="trendingTopicItem cursor-pointer text-violet-700 dark:text-gray-200"
        >
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
      <section className="content mt-0.5 flex flex-col items-center justify-center">
        <h1 className="w-56 py-5 text-center text-xl font-bold  text-violet-700 dark:text-gray-200 md:w-80">
          Inspírate, busca, guarda, y crea los mejores <span className="text-green-400">GIFOS</span>
        </h1>
        <div className="searchBlockImg">
          <img src={headerLogo} alt="logo" className="w-[273px] md:w-[399px]" />
        </div>
        <div
          className={`searchArea border-2 border-solid border-violet-500 px-5 py-1 dark:border-gray-200 md:w-[551px] ${
            topic.length === 0 ? 'rounded-full' : 'rounded-lg'
          }`}
        >
          <div className="searchBar flex items-center justify-between gap-2 py-1">
            <div className="searchIcon">
              {topic.length !== 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              ) : (
                <p className=" w-6"></p>
              )}
            </div>
            <input
              type="text"
              className="searchInput w-full border-0 border-solid outline-none dark:bg-gray-800 dark:text-gray-200"
              placeholder="Busca GIFOS y más"
              value={topic}
              // onChange={(e) => setTopic(e.target.value)}
              onChange={(e) => {
                handleSearch(e.target.value);
                setTopic(e.target.value);
              }}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSearch(topic) : '')}
            />
            {topic.length == 0 ? (
              <button className="searchBtn" type="submit">
                <div className="searchIcon" onClick={(e) => handleSearch(topic)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </button>
            ) : (
              <button className="searchCloseBtn">
                <p
                  className="searchCloseIcon text-2xl text-violet-700 dark:text-gray-200"
                  onClick={() => {
                    setTopic('');
                    setDataSearch([]);
                    setLimit(12);
                  }}
                >
                  x
                </p>
              </button>
            )}
          </div>
          {dataSuggest.length !== 0 && topic.length !== 0 ? (
            <div className="searchSuggest flex flex-col items-center justify-start">
              <div
                className={`barTrend w-[505px] border-t-2 border-solid border-gray-200 py-1`}
              ></div>
              {dataSuggest.slice(0, 4).map((item: any, index: number) => {
                return (
                  <div
                    className="flex w-[505px] flex-row items-center justify-start gap-2 py-1"
                    key={index}
                    onClick={() => handleSearch(item.name)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                    <span key={index} className="searchSuggestItem cursor-pointer text-gray-400">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div className="trendingTopic py-5 text-center">
          <h3 className="text-xl font-bold text-violet-700 dark:text-gray-200">Trending:</h3>
          <p className="dark:text-gray-200">{renderTrending()}</p>
        </div>
        {topic.length !== 0 ? (
          <LayoutContainer
            section={topic}
            dataValue={dataSearch}
            noDataImg={searchNoResultIcon}
            noDataText="Intenta con otra búsqueda."
            topBarColor="border-t-2 border-solid border-gray-200"
          />
        ) : (
          <span></span>
        )}
        <div className="flex flex-col items-center justify-center py-10">
          {renderLoadMore(limit, setLimit, dataSearch, 1)}
          {/* {renderLoadMore()} */}
        </div>
      </section>
    </>
  );
};

export default SearchGifo;
