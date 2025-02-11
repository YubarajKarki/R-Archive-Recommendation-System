import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagSearch from "./TagSearch";

function Upload() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [tags, setTags] = useState([]);
  const [resourceImage, setResourceImage] = useState(null);
  const [resourceFile, setResourceFile] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const response = await axios.get(
            "http://127.0.0.1:8000/api/resources/tags/",
            {
              auth: {
                username: parsedUserData.username,
                password: parsedUserData.password,
              },
            }
          );
          setTags(response.data);
          console.log(response.data);
        } else {
          toast.error("User Not Authenticated");
        }
      } catch (error) {
        toast.error("Error fetching tags !");
        console.error(error);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Append the selected tag IDs to the formData
    selectedTagIds.forEach((tagId) => formData.append("tags", tagId));

    if (resourceImage) {
      formData.append("resource_image", resourceImage, resourceImage.name);
    }
    if (resourceFile) {
      formData.append("resource_file", resourceFile, resourceFile.name);
    }

    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        console.error("User data not found in local storage");
        return;
      }
      const parsedUserData = JSON.parse(storedUserData);

      const username = parsedUserData.username;
      const password = parsedUserData.password;
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/resources/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response data:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Resources Uploaded Successfully !");
        console.log("Resources Uploaded Successfully");
      } else {
        toast.error("Failed to upload the resource");
        console.error("Failed to upload the resource");
      }
    } catch (error) {
      console.error("Error uploading resources", error.response.status);
      console.error("Error data:", error.response.data);
    }
  };
  
  return (
    <div className="max-w-md mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">Upload Resource</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Tags
          </label>
          <TagSearch
          tags={tags}
          selectedTags={selectedTagIds}
          onTagChange={setSelectedTagIds}
        />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="resource-image"
            className="block text-gray-700 font-bold mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="resource-image"
            onChange={(e) => setResourceImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="resource-file"
            className="block text-gray-700 font-bold mb-2"
          >
            Upload File
          </label>
          <input
            type="file"
            id="resource-file"
            onChange={(e) => setResourceFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
