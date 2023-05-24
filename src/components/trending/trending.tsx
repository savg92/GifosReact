import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Scrollbar, A11y } from 'swiper';
import { useEffect, useState } from 'react';
import Gifo from '../gifo/gifo';
import { getTrendingGifos } from '../../services/services';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      <section className="dark:bg-gray-900 p-16 bg-slate-100">
        <div className="flex flex-col items-center justify-center dark:text-gray-200 pb-8">
          <p className="trendingTitle">Trending GIFOS</p>
          <p className="trendingText">Mira los últimos GIFOS de nuestra comunidad.</p>
        </div>
        <div className="flex justify-center px-10 py-10">
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            spaceBetween={0}
            slidesPerView={4}
            // loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            // mousewheel={true}
            keyboard
          >
            <div>
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <Gifo
                    Id={item.id}
                    images={item.images}
                    title={item.title}
                    username={item.username}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default trending;
