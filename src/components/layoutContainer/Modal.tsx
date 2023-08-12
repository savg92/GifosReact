import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Gifo from '../gifo/gifo';
import GifoModal from '../gifo/gifoModal';
import { useState } from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  modalData?: any[];
  initialSlide?: number;
}

const Modal = ({
  isVisible,
  onClose,
  children,
  modalData,
  initialSlide,
}: ModalProps): JSX.Element | null => {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const target = e.target as HTMLDivElement;
    if (target.id === 'wrapper') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col">
        <button className="place-self-end text-xl text-white" onClick={() => onClose()}>
          X
        </button>
        <div className="rounded bg-white p-2 text-black">
          {/* {children} */}
          <div className="justify-center md:flex md:h-[700px] md:w-[900px] md:px-10 md:py-10">
            <Swiper
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              // spaceBetween={2}
              slidesPerView={1}
              // loop={true}
              navigation={true}
              // pagination={{ clickable: true }}
              // mousewheel={true}
              keyboard={true}
              initialSlide={initialSlide}
              // breakpoints={{
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
              //   1024: {
              //     slidesPerView: 4,
              //     spaceBetween: 5,
              //   },
              // }}
            >
              {modalData?.map((item, index) => (
                <SwiperSlide key={index} className="flex w-full items-center justify-center">
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
        {/* {children} */}
      </div>
    </div>
  );
};

export default Modal;
