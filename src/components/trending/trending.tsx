import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
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
  
  </>
);
};

export default trending;
