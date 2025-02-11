import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement form validation here
    if (!formData.username || !formData.password) {
      toast.error("Please enter your email and password!", {
        position: "top-center",
        autoClose: 1000,
      });
      return; // Prevent form submission if fields are empty
    }
    try {
      await login(formData);
      toast.success("Login Sucessfull!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials. Please try again!", {
        position: "top-center",
        autoClose: 1000,
      });
      console.error("Login error:", error);
      // alert("Invalid credentials. Please try again.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div>
      <main className="dark:bg-gray-900 w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-800 dark:text-gray-400 text-xl font-semibold sm:text-2xl">
                Welcome
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 font-bold">Email</label>
              <input
                type="email"
                name="username"
                id="username"
                placeholder="xyz@gmail.com"
                // autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 font-bold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                // autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              LOGIN
            </button>
          </form>
          <p className="text-center text-sm">
            Don’t have an account yet?{" "}
            <Link
              to={"/signup"}
              className=" font-bold text-blue-600 hover:underline dark:text-blue-500"
            >
              Signup now
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
