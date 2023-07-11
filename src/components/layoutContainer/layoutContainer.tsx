import React, { useEffect, useState } from 'react';
import Gifo from '../gifo/gifo';
import { getFavoriteGifos } from '../../services/services';

interface LayoutContainerProps {
  sectionIcon?: string;
  section?: string;
  dataValue?: string[];
  noDataText?: string;
  noDataImg?: string;
  topBarColor?: string;
}

{
  /* <Gifo key={index} Id={id} images={images} title={title} username={username} />; */
}

const layoutContainer = ({
  sectionIcon,
  section,
  dataValue,
  noDataText,
  noDataImg,
  topBarColor,
}: LayoutContainerProps): JSX.Element => {
  return (
    <>
      <section className="contentFavourites mt-4">
        <div
          className="flex flex-col items-center justify-center pb-8 text-xl font-bold dark:text-gray-200"
          id="mainGifContainerFav"
        >
          <div className={`barTrend w-48 py-4 ${topBarColor}`}></div>
          <img src={sectionIcon} alt="" />
          <h1 className="searchedTopic text-violet-700 dark:text-gray-200">{section}</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {dataValue && dataValue.length === 0 ? (
            <div className="flex h-96 w-full justify-center flex-col items-center">
              <span className="noGif">
                <img src={noDataImg} alt="noGif" />
              </span>
              <p className="mt-8 w-96 text-center text-xl font-bold text-green-400 dark:text-gray-200">
                {noDataText}
              </p>
            </div>
          ) : (
            <>
              <div
                id="favContainer"
                className="flex w-full flex-wrap justify-center gap-8 py-3 md:px-12"
              >
                {dataValue?.map((item: any, index: number) => {
                  const { id, images, title, username } = item;
                  return (
                    <Gifo key={index} Id={id} images={images} title={title} username={username} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default layoutContainer;