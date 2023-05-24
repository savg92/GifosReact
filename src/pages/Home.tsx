import Layout from '../components/layout/layout';
import Gifo from '../components/gifo/gifo';
import Trending from '../components/trending/trending';



const Home = () => {
  return (
    <>
      <Layout>
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
        <Trending />
      </Layout>
    </>
  );
};

export default Home;
