import Layout from '../components/layout/layout';
import Trending from '../components/trending/trending';

const MyGIF = () => {
  return (
    <>
      <Layout>
        <h1 className="text-3xl font-bold underline bg-green-500 dark:bg-red-900">
          Hello world 3!
        </h1>
        <Trending />
      </Layout>
    </>
  );
};

export default MyGIF;
