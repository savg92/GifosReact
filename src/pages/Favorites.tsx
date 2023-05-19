import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import { getTrendingGifos } from '../services/services';

const Favorites = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTrendingGifos();
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <h1 className="bg-green-500 text-3xl font-bold underline dark:bg-red-900">
          Hello world 2 vsdfds!
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data &&
            data.map((gifo: any) => (
              <Gifo
                key={gifo.id}
                Id={gifo.id}
                images={gifo.images}
                title={gifo.title}
                username={gifo.username}
              />
            ))}
        </div>
      </Layout>
    </>
  );
};

export default Favorites;
