// eslint-disable-next-line react/prop-types
function Search({ searchTerm, onSearch, onInputChange }) {
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center">
      <div className="relative mr-2">
        <input
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          placeholder="Search resources..."
          className=" px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-[480px]"
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 top-0 h-full px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Search;
