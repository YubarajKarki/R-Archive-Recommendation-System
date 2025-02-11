import { useEffect, useState } from "react";
import defaultImg from "/image/defaultImg.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "../rating/Rating";

function Details() {
  const { bookId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);

          const recommendationsResponse = await axios.get(
            "http://127.0.0.1:8000/api/home/recomendations/",
            {
              auth: {
                username: parsedUserData.username,
                password: parsedUserData.password,
              },
            }
          );

          const allResourcesResponse = await axios.get(
            "http://127.0.0.1:8000/api/resources/details/all_resources/",
            {
              auth: {
                username: parsedUserData.username,
                password: parsedUserData.password,
              },
            }
          );

          setRecommendations(
            recommendationsResponse.data.recomendation_resources
          );
          setAllResources(allResourcesResponse.data);
          setUser(recommendationsResponse.data.user_id);
        } else {
          toast.error("User not authenticated");
          // setError("User not authenticated");
        }
      } catch (err) {
        toast.error("Error fetching data");
        // console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReadResource = () => {
    const selectedBook =
      recommendations.find(
        (resource) => resource.resource_id === parseInt(bookId)
      ) ||
      allResources.find(
        (resource) => resource.resource_id === parseInt(bookId)
      );

    if (selectedBook && selectedBook.resource_file) {
      const resourceFileUrl = `http://localhost:8000${selectedBook.resource_file}`;
      window.open(resourceFileUrl, "_blank");
    } else {
      toast.error("Resource file not available");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-56">
        <ThreeCircles
          visible={true}
          height="300"
          width="200"
          color="#326DF5"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const selectedBook =
    recommendations.find(
      (resource) => resource.resource_id === parseInt(bookId)
    ) ||
    allResources.find((resource) => resource.resource_id === parseInt(bookId));

  return (
    <div
      key={selectedBook.id}
      className="grid grid-cols-10 font-montserrat gap-x-2 justify-items-center mt-32"
    >
      <div className=" col-span-3 ">
        {selectedBook.resource_image ? (
          <img
            className="h-[400px] w-[300px] aspect-auto object-fill object-center"
            src={`http://localhost:8000${selectedBook.resource_image}`}
            alt={selectedBook.name}
          />
        ) : (
          <img
            className="h-[400px] w-[300px] aspect-auto object-fill object-center"
            src={defaultImg}
            alt="Default Image"
          />
        )}
        <div className="flex flex-col flex-wrap">
          <div className="h-[40px] w-full  bg-[#409d69] text-white text-xl font-medium p-2 rounded-sm text-center cursor-pointer hover:bg-[#297a39] tracking-wide mt-2">
            Rate it
          </div>
          <Rating resourceId={selectedBook.resource_id} userId={user} />
        </div>
      </div>
      <div className="text-xl col-span-6 font-black">
        <div className="bg-gray-300 rounded-lg p-4 shadow-md text-gray-800">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {selectedBook.name}
          </h1>
          <h2 className="mb-2">
            Uploaded by User ID:{" "}
            <span className="font-normal">{selectedBook.uploaded_by}</span>
          </h2>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-gray-700">Average Rating:</span>
            <span className="font-semibold">
                      {typeof selectedBook.rating === "number"
                        ? selectedBook.rating.toFixed(2)
                        : "NA"}
            </span>
          </div>
          <div className="flex flex-wrap mb-4">
            <span className="mr-2 text-gray-700">Tags:</span>
            {selectedBook.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className=" text-gray-700 leading-relaxed">
            Description:{" "}
            <span className="font-normal">{selectedBook.description}</span>
          </p>
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleReadResource}
            >
              Read Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
