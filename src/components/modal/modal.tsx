import { useState } from 'react';
import GifoModal from '../gifo/gifoModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Modal = ( data: any, index: number = 0) => {
  // console.log(data.data);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className=" rounded 
      bg-blue-200 px-2 py-1 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500"
        type="button"
        onClick={() => setShowModal(true)}
      >
        E
      </button>
      {showModal ? (
        <>
          <div className="Modal fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
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
                    initialSlide={index}
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
                      <SwiperSlide
                        key={index}
                        className="w-max px-3 pt-10 md:px-0 md:pl-10 md:pt-1"
                      >
                        <GifoModal
                          Id={item.id}
                          images={item.images}
                          title={item.title}
                          username={item.username}
                        />
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