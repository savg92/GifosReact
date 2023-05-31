import { useState, useEffect } from 'react';
import { GifoProps } from './gifo';
import { blobDwnld } from '../../handlers/blobDwnld';

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
    <div className="flex flex-col items-center justify-center">
      <img
        className="h-auto w-full object-cover md:max-w-sm"
        src={images.original.url}
        alt={title}
      />
      <div className="flex w-full justify-between md:pr-12">
        <div className="flex flex-col ">
          <p className="text-xl  text-black">{username === '' ? 'None' : username}</p>
          <p className="text-2xl font-bold text-black">{title === '' ? 'None' : title}</p>
        </div>
        <div className="flex  items-center justify-center gap-3">
          <button
            className={`rounded
            bg-blue-200 px-6 py-3 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500 ${
              isFavorite ? 'btnLike bg-blue-700' : 'btnLike2'
            }`}
            type="button"
            onClick={handleFavorite}
          >
            {isFavorite ? 'FD' : 'F'}
          </button>
          {/* <div
            className={`h-8 w-8 cursor-pointer ${isFavorite ? 'btnLike bg-gray-700' : 'btnLike2'}`}
            id={Id}
            onClick={handleFavorite}
          >
            F
          </div> */}
          <button
            className=" rounded
                              bg-blue-200 px-6 py-3 font-bold text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-500"
            type="button"
            onClick={() => blobDwnld(images.original.url, title)}
          >
            D
          </button>
        </div>
      </div>
    </div>
  );
};

export default gifoModal;
