import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Scrollbar, A11y } from 'swiper';
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
      <div className='container'>
        <Swiper
          // modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={0}
          // slidesPerView={4.1}
          // navigation

          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          mousewheel
          keyboard
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Gifo Id={item.id} images={item.images} title={item.title} username={item.username} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default trending;
