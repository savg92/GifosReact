import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import Gifo from '../gifo/gifo';
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
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {data &&
        data.map((gifo: any) => (
          <SwiperSlide key={gifo.id} id={gifo.id}>
            <Gifo Id={gifo.id} images={gifo.images} title={gifo.title} username={gifo.username} />
          </SwiperSlide>
        ))}
    </Swiper>
  </>
);
};

export default trending;
