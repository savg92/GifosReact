import React, { useState } from 'react';
import { GifoProps } from '..//gifo/gifo';
import { useEffect } from 'react';
import { blobDwnld } from '../..//handlers/blobDwnld';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Modal = ({data}:any) => {
  const { Id, images, title, username } = data.data
  // console.log(data1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  useEffect(() => {
    setIsFavorite(favorites.includes(Id));
  }, [favorites]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((favorite: string) => favorite !== Id)
      : [...favorites, Id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <button
        className=" rounded 
      bg-blue-200 px-6 py-3 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500"
        type="button"
        onClick={() => setShowModal(true)}
      >
        E
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto  w-auto ">
              <div className="relative  rounded-lg  bg-white shadow-lg  focus:outline-none">
                <div className="flex items-start justify-end pr-12 pt-32 md:pr-64 md:pt-44">
                  <button
                    className="float-right border-0 bg-transparent text-black"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-7 block h-6 w-6 rounded-full bg-gray-400 py-0 text-xl text-black">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative h-screen w-screen flex-auto md:p-6 md:px-64">
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
                        slidesPerView: 1,
                        spaceBetween: 10,
                        navigation: {
                          enabled: false,
                        },
                      },
                      640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        navigation: {
                          enabled: false,
                        },
                      },
                      768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        navigation: {
                          enabled: true,
                        },
                      },
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 1,
                        navigation: {
                          enabled: true,
                        },
                      },
                    }}
                  >
                    {data.data.map((item: any, index: number) => (
                      <SwiperSlide key={index} className="w-max md:pl-10 pt-10 md:pt-1 px-3 md:px-0">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            className="w-full h-auto object-cover max-w-2xl max-h-md"
                            src={item.images.original.url}
                            alt={item.title}
                          />
                          <div className="flex justify-between w-full md:pr-12">
                            <div className="flex flex-col ">
                              <p className="text-xl  text-black">
                                {item.username === ''
                                  ? 'None'
                                  : item.username}
                              </p>
                              <p className="text-2xl font-bold text-black">
                                {item.title === '' ? 'None' : item.title}
                              </p>
                            </div>
                            <div className="flex  justify-center items-center">
                              <button
                                className=" rounded
                              bg-blue-200 px-6 py-3 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500"
                                type="button"
                                onClick={() => blobDwnld(item.images.original.url, item.title)}
                              >
                                D
                              </button>
                              <button
                                className=" rounded
                              bg-blue-200 px-6 py-3 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500"
                                type="button"
                                onClick={handleFavorite}
                              >
                                {isFavorite ? 'R' : 'F'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
