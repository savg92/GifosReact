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
      <section className="bg-slate-100 p-8 md:p-16 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center pb-8 dark:text-gray-200">
          <p className="trendingTitle">Trending GIFOS</p>
          <p className="trendingText text-center">Mira los últimos GIFOS de nuestra comunidad.</p>
        </div>
        <div className="hidden justify-center md:flex md:px-10 md:py-10">
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            spaceBetween={1}
            slidesPerView={4}
            // loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            // mousewheel={true}
            keyboard
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="w-max">
                <Gifo
                  Id={item.id}
                  images={item.images}
                  title={item.title}
                  username={item.username}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center py-10 md:hidden md:px-10">
          <Swiper
            slidesPerView={2}
            spaceBetween={70}
            // centeredSlides={true}
            // pagination={{
            //   clickable: true,
            // }}
            // modules={[Pagination]}
            className="mySwiper"
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
