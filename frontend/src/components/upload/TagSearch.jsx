/* eslint-disable react/prop-types */
import { useState } from "react";

const TagSearch = ({ tags, selectedTags, onTagChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tags based on search term
  const filteredTags = tags.filter((tag) =>
    tag.tag_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    onTagChange(selectedOptions);
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search tags..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <select
        multiple
        value={selectedTags}
        onChange={handleTagChange}
        className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" className="text-lg font-bold text-white">
          Select tags
        </option>
        {filteredTags.map((tag) => (
          <option key={tag.tag_id} value={tag.tag_id}>
            {tag.tag_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagSearch;
