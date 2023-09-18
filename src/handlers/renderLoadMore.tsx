export const renderLoadMore = (
  state: number,
  setState: React.Dispatch<React.SetStateAction<number>>,
  dataInfo: any[],
  num: number = 0
) => {
  const handleLoadMore = () => {
    setState(state + 12);
  };
  if (dataInfo.length > state - num) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="loadMore">
          <button
            className="btn btnLoadMore h-12 w-60 rounded-full border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800"
            onClick={handleLoadMore}
          >
            Ver más
          </button>
        </div>
      </div>
    );
  }
};