import { useEffect, useState } from 'react';
import Gifo from '../gifo/gifo';
import { getTrendingGifos } from '../../services/services';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
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
      <section className="bg-slate-100 p-8 dark:bg-gray-900 md:p-16">
        <div className="flex flex-col items-center justify-center pb-8 dark:text-gray-200">
          <p className="trendingTitle">Trending GIFOS</p>
          <p className="trendingText text-center">Mira los últimos GIFOS de nuestra comunidad.</p>
        </div>
        <div className="justify-center md:flex md:px-10 md:py-10">
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            // spaceBetween={3}
            // slidesPerView={3}
            // loop={true}
            navigation={true}
            // pagination={{ clickable: true }}
            // mousewheel={true}
            keyboard={true}
            breakpoints={{
              375: {
                slidesPerView: 2,
                spaceBetween: 10,
                navigation: {
                  enabled: false,
                },
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 75,
                navigation: {
                  enabled: false,
                },
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
            }}
            // injectStyles=[{ display: 'flex' }]
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
      </section>
    </>
  );
};

export default trending;
