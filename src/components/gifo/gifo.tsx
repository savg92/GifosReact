import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './gifo.module.scss';
import { blobDwnld } from '../..//handlers/blobDwnld';

export interface GifoProps {
  className?: string;
  Id: string;
  images: {
    original: {
      url: string;
    };
  };
  title: string;
  username: string;
}

const Gifo = ({ className, Id, images, title, username }: GifoProps) => {
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
    <div className=" mr-0 flex h-32  w-40 justify-center md:h-48 md:w-64">
      <img
        className="max-w-40 md:max-w-64 h-auto  w-auto md:max-h-48"
        src={images.original.url}
        alt={title}
        loading="lazy"
      ></img>
      <div className="absolute box-border flex h-32 w-40 flex-1 flex-col justify-between p-4 opacity-0 hover:bg-violet-500 hover:opacity-90 md:h-48 md:w-64">
        <div className="flex justify-end gap-1 align-top">
          <div
            className={`h-8 w-8 cursor-pointer ${isFavorite ? 'btnLike bg-gray-700' : 'btnLike2'}`}
            id={Id}
            onClick={handleFavorite}
          >
            F
          </div>
          <div className="h-8 w-8 cursor-pointer" onClick={() => blobDwnld(images.original.url, title)}
          >D</div>
          <div className="h-8 w-8 cursor-pointer">E</div>
        </div>
        <div className="md:max-w-48 box-border flex flex-col justify-end align-bottom text-white">
          <p className="gifUser max-w-48 break-all">{username !== '' ? username : 'None'}</p>
          <p className="gifTitle max-w-48 break-all font-bold">{title !== '' ? title : 'None'}</p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Gifo;
