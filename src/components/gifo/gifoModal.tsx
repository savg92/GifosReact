import { useState, useEffect } from 'react';
import { GifoProps } from './gifo';
import { blobDwnld } from '../../handlers/blobDwnld';
import download from '../../assets/icon-download-hover.svg';
import NofavIcon from '../../assets/icon-fav-hover.svg';
import FavIcon from '../../assets/icon-fav-hover2.svg';

const gifoModal = ({ className, Id, images, title, username }: GifoProps) => {
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
    <div className="flex flex-col items-center justify-center gap-4">
      <img
        // className="h-auto w-full object-cover "
        // className="h-full max-h-96 w-full object-cover "
        className="max-h-[380px]"
        // className="max-h-[380px] sm:mw-[100px]"
        // className="sm:w-[100px]"
        src={images.original.webp}
        alt={title}
      />
      <div className="flex w-full justify-between gap-8">
        <div className="flex flex-col ">
          <p className="text-sm  text-black">{username === '' ? 'None' : username}</p>
          <p className="text-sm font-bold text-black">{title === '' ? 'None' : title}</p>
        </div>
        <div className="flex  items-center justify-center gap-3">
          <button className={`h-8 w-8`} id={Id} onClick={handleFavorite} title="Añadir a favoritos">
            {isFavorite ? (
              <img src={FavIcon} alt="fav" className="opacity-70 hover:opacity-100" />
            ) : (
              <img src={NofavIcon} alt="nofav" className="opacity-70 hover:opacity-100" />
            )}
          </button>
          <button
            className="h-8 w-8 cursor-pointer"
            title="Descargar"
            onClick={() => blobDwnld(images.original.url, title)}
          >
            <img src={download} alt="download" className="opacity-70 hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default gifoModal;
