import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending from '../components/trending/trending';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

const Home = () => {
  return (
    <>
      <Layout>
        <main className="mt-28">
          <h1 className="bg-green-500 text-3xl font-bold underline dark:bg-red-900">
            Hello world!
          </h1>
          <Gifo
            Id="1"
            images={{
              original: {
                url: 'https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg',
              },
            }}
            title="title"
            username="username"
          />
          <Swiper
            // modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            // spaceBetween={50}
            // slidesPerView={5}
            // navigation
            // pagination={{ clickable: true }}
            // mousewheel
            // keyboard
            // className="mySwiper"

            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>1</SwiperSlide>
            <SwiperSlide>2</SwiperSlide>
            <SwiperSlide>3</SwiperSlide>
            <SwiperSlide>4</SwiperSlide>
            <SwiperSlide>5</SwiperSlide>
          </Swiper>
          <Trending />
        </main>
      </Layout>
    </>
  );
};

export default Home;
