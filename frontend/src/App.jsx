import { useRoutes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import { AuthProvider } from "./components/auth/AuthProvider";
import Recomendations from "./components/home/Recommendations";
import Home from "./components/home/Home";
import Upload from "./components/upload/Upload";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Details from "./components/details/Details";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const routesArray = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Home searchTerm={searchTerm} />,
    },
    {
      path: "/recommendation",
      element: <Recomendations />,
    },
    {
      path: "/upload",
      element: <Upload />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/book/show/:bookId/:bookSlug",
      element: <Details />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ];

  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Navbar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="mt-20">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
