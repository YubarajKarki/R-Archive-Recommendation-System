import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({ user: null });

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
      // console.log("User set from localStorage:", parsedUserData);
    }
  }, []);

  const login = async (formData) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.get(
        "http://127.0.0.1:8000/api/users/details/",
        { auth: { username: formData.username, password: formData.password } }
      );
      // Set user data in Local Storage when the user logs in
      const userData = {
        username: formData.username,
        password: formData.password,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/create/",
        formData
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const getUser = async () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
