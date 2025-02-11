/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Recomendations from "./Recommendations";
import defaultImg from "/image/defaultImg.jpg";
import kidslearning from "/image/KidsLearning.png";

// eslint-disable-next-line react/prop-types
function Home({ searchTerm }) {
  const [recommendations, setRecommendations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);

          const response = await axios.get(
            "http://127.0.0.1:8000/api/resources/details/all_resources/",
            {
              auth: {
                username: parsedUserData.username,
                password: parsedUserData.password,
              },
            }
          );

          // console.log("Response data:", response.data);

          setRecommendations(response.data);
          setUser(response.data.user_id);
        } else {
          setError("User not authenticated");
          toast.error("User Not Authenticated");
        }
      } catch (err) {
        toast.error("Error fetching recommendations");
        setError("Error fetching recommendations");
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const filteredRecommendations = recommendations.filter((resource) =>
    // eslint-disable-next-line react/prop-types
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40">
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div className="flex flex-row">
        <div className="basis-1/3">
          <img
            className="relative h-[580px] w-auto object-cover object-center"
            src={kidslearning}
            alt="kidsreading"
          />
        </div>
        <div className="basis-2/3 m-4 text-center">
          <h1 className="text-3xl font-black font-montserrat">R-Archive</h1>
          <h2 className="text-xl font-normal font-roboto break-words tracking-widest mt-36">
            “R-Archive” is a web application designed to maintain to store
            digital documents form users to archive them and make accessible to
            any users . Not only archiving the digital documents it provides
            personalized learning experience and enhance the user engagement.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-12 grid-flow-col gap-x-2 bg-gray-500">
        <div className="col-span-8 mx-12">
          <h2 className="text-white font-bold text-3xl mx-3 my-1">
            Read All Available Resources
          </h2>
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((resource) => (
              <div
                key={resource.resource_id}
                className="flex flex-row bg-gray-300 mx-2 mb-2 rounded-sm hover:shadow-lg hover:opacity-70"
              >
                <div className="flex flex-row w-3/4 float-left">
                  {resource.resource_image ? (
                    <img
                      className="hover:z-20 h-[105px] w-[80px]  aspect-auto object-cover object-center hover:scale-150 transition duration-300  hover:ease-in-out"
                      src={`http://localhost:8000${resource.resource_image}`}
                      alt={resource.name}
                    />
                  ) : (
                    <img
                      className="hover:z-20 h-[105x] w-[80px] aspect-auto object-cover object-center hover:scale-150 transition duration-300  hover:ease-in-out"
                      src={defaultImg}
                      alt="Default Image"
                    />
                  )}
                  <div className="w-full py-2 px-2.5 break-words overflow-hidden">
                    <h2 className="font-montserrat text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
                      <Link
                        to={`/book/show/${
                          resource.resource_id
                        }/${encodeURIComponent(
                          resource.name.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                        className="cursor-pointer text-black hover:text-blue-500 font-medium size-4"
                      >
                        {resource.name}
                      </Link>
                    </h2>

                    <div className="font-roboto text-lg py-4 px-0 flex flex-row items-center text-black h-2">
                      <span className="mr-4">
                        Average Rating:{" "}
                        {typeof resource.rating === "number"
                          ? resource.rating.toFixed(2)
                          : "NA"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-screen justify-center items-center">
              <div className="bg-red-400 p-8 rounded-md font-bold tracking-widest leading-10 text-4xl">
                &#x1F449; No resources found for {searchTerm} &#x1F448;
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4 h-screen sticky top-0 overflow-y-auto">
          <Recomendations />
        </div>
      </div>
    </div>
  );
}

export default Home;
