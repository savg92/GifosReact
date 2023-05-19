import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './gifo.module.scss';

export interface GifoProps {
  className?: string;
  Id: string;
  images: any;
  title: string;
  username: string;
}

const Gifo = ({ className, Id, images, title, username }: GifoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(Id));
  }, [Id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((favorite: string) => favorite !== Id)
      : [...favorites, Id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={classNames(className, styles.gifo)}>
      <div className="box-border flex h-32 w-40 items-center justify-center md:h-48 md:w-64">
        <img
          className="max-w-40 h-auto max-h-32 w-auto md:max-h-48 md:max-w-64"
          src={images.original.url}
          alt={title}
          loading='lazy'
        ></img>
        <div className="absolute box-border flex h-32 w-40 flex-1 flex-col justify-between p-4 opacity-0 hover:bg-violet-500 hover:opacity-70 md:h-48 md:w-64">
          <div className="flex justify-end gap-1 align-top">
            <div
              className={`h-8 w-8 cursor-pointer ${
                isFavorite ? 'btnLike bg-gray-700' : 'btnLike2'
              }`}
              id={Id}
              onClick={handleFavorite}
            ></div>
            <div className="h-8 w-8 cursor-pointer"></div>
            <div className="h-8 w-8 cursor-pointer"></div>
          </div>
          <div className="md:max-w-48 box-border flex flex-col justify-end align-bottom">
            <p className="gifUser max-w-48 break-all">{username!==''?username:'None'}</p>
            <p className="gifTitle max-w-48 break-all">{title!==''?title:'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifo;