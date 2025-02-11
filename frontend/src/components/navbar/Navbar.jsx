/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import Search from "../search/Search";

function Navbar({ searchTerm, onSearch, onInputChange }) {
  const { user, logout } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
    // console.log("Navbar useEffect triggered with user:", user);
    console.log(user);
  }, [user]);

  return (
    <nav className="flex items-center font-montserrat justify-between place-content-center bg-black w-full h-20 fixed z-50 shadow-md top-0 left-0">
      <div className="">
        <span className=" w-[45px] ml-12 text-green-500 text-2xl font-bold">R-Archive</span>
      </div>

      <div className=" text-[#a8a8a8] text-xl font-medium tracking-wide capitalize flex items-center mr-12 gap-4">
        {user ? (
          <>
            <Search
              searchTerm={searchTerm}
              onSearch={onSearch}
              onInputChange={onInputChange}
            />
            <button className="no-underline hover:underline hover:text-blue-400 px-4 py-2">
              <Link to="/">Home</Link>
            </button>

            {/* <button className=" no-underline hover:underline  hover:text-blue-400 px-4 py-2">
              <Link to="/recommendation">Recommendations</Link>
            </button> */}

            <button className=" no-underline hover:underline  hover:text-blue-400 px-4 py-2">
              <Link to="/upload">Upload</Link>
            </button>

            <button className=" no-underline hover:underline  hover:text-blue-400 px-4 py-2">
              <Link to="/profile">Profile</Link>
            </button>

            <button
              className="bg-blue-500 hover:underline text-black rounded-full  hover:text-blue-200 px-4 py-2"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="no-underline hover:underline  hover:text-blue-400 px-4 py-2">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-blue-400 hover:underline text-black rounded-full hover:text-white px-4 py-2">
              <Link to="/signup">Register Now</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
