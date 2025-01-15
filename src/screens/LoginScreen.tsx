import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/const";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create navigate function
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset any previous message

    try {
      // Make the API call
      const response = await axios.post(
        `${BASE_URL}/admin/login`,
        {
          email: formData.email,
          password: formData.password,
        }, // Sending JSON data in req.body
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to JSON
          },
        }
      );

      console.log("response is: ", response);
      // Handle success response
      if (response.status === 200) {
        setMessage("Login successful!");
        dispatch(setCredentials(response.data));

        // Navigate to home page
        navigate("/");
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      // Handle error
      console.error(error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

            {message && (
              <div
                className={`text-sm mb-4 ${
                  message.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginScreen;
