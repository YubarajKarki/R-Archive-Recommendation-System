import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [uploadedResources, setUploadedResources] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/details/",
          {
            auth: {
              username: user.username,
              password: user.password,
            },
          }
        );

        const uploadedResourcesResponse = await axios.get(
          "http://127.0.0.1:8000/api/resources/details/",
          {
            auth: {
              username: user.username,
              password: user.password,
            },
          }
        );

        const loggedInUser = response.data.find(
          (userData) => userData.email === user.username
        );
        setUserData(loggedInUser);
        setUploadedResources(uploadedResourcesResponse.data);
      } catch (error) {
        toast.error("Error Fetching Data");
        // console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className=" overflow-hidden shadow rounded-lg border font-roboto">
      <div className="px-4 py-5 sm:px-6">
        <div className="px-2 md:px-6">
          <img
            className="object-fit w-44  m-2 hidden rounded-full ring-2 ring-green-700 shadow-lg shadow-green-500 md:block"
            src={
              // userData?.profile_pic ||
              "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg"
            }
            alt="User_Profile_Pic"
          />
        </div>
      </div>
      <div className="border-t text-lg font-semibold border-gray-200 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="bg-gray-300 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Full name</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.first_name} {userData?.last_name}
            </dd>
          </div>
          <div className=" py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">First Name</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.first_name}
            </dd>
          </div>
          <div className="bg-gray-300 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Last Name</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.last_name}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Age</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.age}
            </dd>
          </div>
          <div className="bg-gray-300 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Email address</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.email}
            </dd>
          </div>
          <div className="  py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Phone number</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.phone_number || "Null"}
            </dd>
          </div>
          <div className="bg-gray-300 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Address</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {userData?.address || "Null"}
            </dd>
          </div>
          <dt className="font-extrabold text-xl mt-0 m-2 p-6">
            Uploaded Resources
          </dt>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-bold">Name</dt>
            <dd className="font-bold mt-1 sm:mt-0 sm:col-span-2">
              Description
            </dd>
          </div>
          {uploadedResources.length > 0 ? (
            uploadedResources.map((resource) => (
              <div
                key={resource.resource_id}
                className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="font-bold">
                  <h2 className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                    <Link
                      to={`/book/show/${
                        resource.resource_id
                      }/${encodeURIComponent(
                        resource.name.toLowerCase().replace(/\s+/g, "-")
                      )}`}
                      className="cursor-pointer text-blue-700 text-2xl hover:text-white font-medium"
                    >
                      {resource.name}
                    </Link>
                  </h2>
                </dt>
                <dd className="mt-1 text-xl sm:mt-0 sm:col-span-2">
                  {resource.description}
                </dd>
              </div>
            ))
          ) : (
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dd className="font-bold mt-1 sm:mt-0 sm:col-span-3 ">
                No Resources Uploaded Yet
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default Profile;
