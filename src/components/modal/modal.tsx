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
  console.log(data);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

//   useEffect(() => {
//     setIsFavorite(favorites.includes(Id));
//   }, [favorites]);

//   const handleFavorite = () => {
//     const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//     const newFavorites = isFavorite
//       ? favorites.filter((favorite: string) => favorite !== Id)
//       : [...favorites, Id];
//     localStorage.setItem('favorites', JSON.stringify(newFavorites));
//     setIsFavorite(!isFavorite);
//   };
  return (
    <>
      <button
        className="mb-1 mr-1 rounded 
      bg-blue-200 px-6 py-3 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto  w-auto ">
              <div className="relative  rounded-lg  bg-white shadow-lg  focus:outline-none">
                <div className="flex items-start justify-end p-5 ">
                  <button
                    className="float-right border-0 bg-transparent text-black"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-7 block h-6 w-6 rounded-full bg-gray-400 py-0 text-xl text-black">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6">
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
                      //   375: {
                      //     slidesPerView: 2,
                      //     spaceBetween: 10,
                      //     navigation: {
                      //       enabled: false,
                      //     },
                      //   },
                      //   640: {
                      //     slidesPerView: 3,
                      //     spaceBetween: 75,
                      //     navigation: {
                      //       enabled: false,
                      //     },
                      //   },
                      //   768: {
                      //     slidesPerView: 2,
                      //     spaceBetween: 10,
                      //   },
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                      },
                    }}
                    // injectStyles=[{ display: 'flex' }]
                  >
                    {/* {data.map((item: any, index: number) => (
                      <SwiperSlide key={index} className="w-max">
                        <img
                          // src={item.images.original.url}
                          src="https://picsum.photos/200/300"
                          alt={item.title}
                          className="h-64 w-64 object-cover"
                        />
                      </SwiperSlide>
                    ))} */}
                    <SwiperSlide className="">
                        <img
                            // src={item.images.original.url}
                            src="https://picsum.photos/200/300"
                            alt="item.title"
                            className="h-64 w-64 object-cover"
                        />
                    </SwiperSlide>
                  </Swiper>
                </div>
                {/* <div className="flex items-center justify-between p-6">
                  <div className="box-border flex flex-col">
                    <p className="gifUser max-w-48 break-all">
                      {username !== '' ? username : 'None'}
                    </p>
                    <p className="gifTitle max-w-48 break-all font-bold">
                      {title !== '' ? title : 'None'}
                    </p>
                  </div>
                  <div className="flex justify-end gap-1 align-top">
                    <div
                      className={`h-8 w-8 cursor-pointer ${
                        isFavorite ? 'btnLike bg-gray-700' : 'btnLike2'
                      }`}
                      id={Id}
                      onClick={handleFavorite}
                    >
                      F
                    </div>
                    <div
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => blobDwnld('https://picsum.photos/200/300', title)}
                    >
                      D
                    </div>
                  </div>
                  {/* <div className="absolute box-border flex h-32 w-40 flex-1 flex-col justify-between p-4 opacity-0 hover:bg-violet-500 hover:opacity-90 md:h-48 md:w-64">
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
