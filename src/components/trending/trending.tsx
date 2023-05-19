import React from 'react';
import { useEffect, useState } from 'react';
import { Gifo } from '../gifo/gifo';
import { getTrendingGifos } from '../../services/services';

const trending = () => {
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
    </>
  );
};

export default trending;
