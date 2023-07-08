import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';
import SearchGifo from '../components/searchGifoContainer/SearchGifo'

const Home = () => {
  return (
    <>
      <Layout>
        <SearchGifo />
        <Trending />
      </Layout>
    </>
  );
};

export default Home;
