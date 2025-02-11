/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultImg from "/image/defaultImg.jpg";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Recomendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);

          const response = await axios.get(
            "http://127.0.0.1:8000/api/home/recomendations/",
            {
              auth: {
                username: parsedUserData.username,
                password: parsedUserData.password,
              },
            }
          );

          // console.log("Response data:", response.data);

          setRecommendations(response.data.recomendation_resources);
          setUser(response.data.user_id);
        } else {
          toast.error("User Not Authenticated");
        }
      } catch (err) {
        toast.error("Error fetching recommendations !");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

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

  return (
    <div className="grid grid-flow-col gap-x-2 bg-gray-500 mr-4">
      <div className="">
        <h2 className="text-white font-bold text-3xl mx-3 my-1">
          {" "}
          You may also like
        </h2>
        {recommendations.map((resource) => (
          <div
            key={resource.resource_id}
            className="flex flex-row bg-gray-300 mb-2 rounded-sm hover:shadow-lg hover:opacity-70 "
          >
            <div className="flex flex-row w-3/4 float-left">
              {resource.resource_image ? (
                <img
                  className="hover:z-50 h-[105px] w-[80px] aspect-auto object-cover object-center hover:scale-150 transition duration-300  hover:ease-in-out"
                  src={`http://localhost:8000${resource.resource_image}`}
                  alt={resource.name}
                />
              ) : (
                <img
                  className="hover:z-20 h-[105px] w-[80px] aspect-auto object-cover object-center hover:scale-150 transition duration-300  hover:ease-in-out"
                  src={defaultImg}
                  alt="Default Image"
                />
              )}
              <div className="w-full py-2 px-2.5 break-words ">
                <h2 className="font-montserrat text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
                  <Link
                    to={`/book/show/${
                      resource.resource_id
                    }/${encodeURIComponent(
                      resource.name.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    className="cursor-pointer text-black hover:text-[#11172b] font-medium size-4"
                  >
                    {resource.name}
                  </Link>
                </h2>

                <div className="font-roboto text-lg py-4 px-0 flex flex-row items-center text-black h-2">
                  <span className="mr-4">
                    Average Rating: {resource.rating.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recomendations;
