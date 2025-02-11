import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    age: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?])(?=.*\d)(?=\S+$).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Invalid password. Password must be at least 8 characters long and contain at least one uppercase, one digit one special character."
      );
      return;
    }

    //confirm password validation
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match!");
      return; // Prevent form submission if passwords don't match
    }

    console.log("Form Data Before Sending: ", formData);
    try {
      await signup(formData); // Passing formData to the signup function
      // Handle successful signup
      toast.success("Signup Sucessfull!");
      navigate("/login");
    } catch (error) {
      toast.error("Signup Failed!");
      console.error("Signup error:", error);
    }
  };

  const handleKeyDown = (event) => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const currentIndex = inputs.indexOf(event.target);

    if (event.key === "Enter") {
      handleSubmit(event);
    } else if (event.key === "ArrowDown") {
      if (currentIndex < inputs.length - 1) {
        event.preventDefault(); // Prevent the default behavior of the arrow keys
        inputs[currentIndex + 1].focus();
      }
    } else if (event.key === "ArrowUp") {
      if (currentIndex > 0) {
        event.preventDefault();
        inputs[currentIndex - 1].focus();
      }
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center">
      <main className="w-full max-w-lg flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-400 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-gray-800 dark:text-gray-400 text-xl font-semibold sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-gray-400 font-bold">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                name="first_name"
                id="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-bold">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Cena"
                required
                value={formData.last_name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-bold">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Kathmandu"
                required
                value={formData.address}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-bold">
                Phone Number
              </label>
              <input
                type="phoneNumber"
                name="phone_number"
                id="phone_number"
                placeholder="9*********"
                maxLength="10"
                required
                value={formData.phone_number}
                pattern="^9\d{9}$"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-bold">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="21"
                required
                value={formData.age}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 font-bold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="xyz@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                required
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                required
                value={formData.confirm_password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="w-full  font-bold text-blue-600 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
