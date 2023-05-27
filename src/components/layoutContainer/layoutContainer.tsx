import React, { useEffect, useState } from 'react';
import Gifo from '../gifo/gifo';
import { getFavoriteGifos } from '../../services/services';

interface LayoutContainerProps {
  funcFetch: Function;
  dataValue?: string[];
  section?: string;
  noDataText?: string;
}

{
  /* <Gifo key={index} Id={id} images={images} title={title} username={username} />; */
}

const layoutContainer = ({
  funcFetch,
  dataValue,
  section,
  noDataText,
}: LayoutContainerProps): JSX.Element => {
    console.log('layoutContainer.tsx: layoutContainerProps: ', funcFetch, dataValue, section, noDataText);

  return (
    <>
      <section className="contentFavourites mt-0.5">
        <div
          className="flex flex-col items-center justify-center pb-8 text-xl font-bold dark:text-gray-200"
          id="mainGifContainerFav"
        >
          <span className="barTrend"></span>
          <h1 className="searchedTopic">{section}</h1>
        </div>
      </section>
    </>
  );
};

export default layoutContainer;

//   <div className="flex flex-wrap justify-center">
//     {data.length === 0 ? (
//       // <div className="col-start-2 col-end-4 flex h-96 w-full justify-center">
//       <div className="flex h-96 w-full justify-center">
//         <span className="noGif"></span>
//         <p className="mt-8  text-center text-xl font-bold dark:text-gray-200 w-96">
//           {noDataText}
//         </p>
//       </div>
//     ) : (
//       <>
//         <div
//           id="favContainer"
//           className="flex w-full flex-wrap justify-center gap-8 py-3 md:px-12"
//         >
//           {renderFavorites()}
//           {data.length > 20 && (
//             <div className="flex w-full justify-center">
//               <button
//                 className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
//                 onClick={handleLoadMore}
//               >
//                 Load more
//               </button>
//             </div>
//           )}
//         </div>
//       </>
//     )}
//   </div>
