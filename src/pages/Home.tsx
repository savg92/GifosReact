import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending  from '../components/trending/trending';
import { getTrendingGifos } from '../services/services';


const Home = () => {


  return (
    <>
      <Layout>
        <h1 className="bg-green-500 text-3xl font-bold underline dark:bg-red-900">Hello world!</h1>
        <Gifo
          Id="1"
          images={{
            original: {
              url: 'https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg',
            },
          }}
          title="title"
          username="username"
        />
        <Trending/>
      </Layout>
    </>
  );
};

export default Home;