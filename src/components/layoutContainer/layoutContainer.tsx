import React, { useEffect, useState } from 'react';
import Gifo from '../gifo/gifo';
import { getFavoriteGifos } from '../../services/services';

interface LayoutContainerProps {
  section?: string;
  dataValue?: string[];
  noDataText?: string;
}

{
  /* <Gifo key={index} Id={id} images={images} title={title} username={username} />; */
}

const layoutContainer = ({ section, dataValue, noDataText }: LayoutContainerProps): JSX.Element => {

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
        <div className="flex flex-wrap justify-center">
          {dataValue && dataValue.length === 0 ? (
            <div className="flex h-96 w-full justify-center">
              <span className="noGif"></span>
              <p className="mt-8 w-96 text-center text-xl font-bold dark:text-gray-200">
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