import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const CreateInterviewScreen = () => {
  const [formData, setFormData] = useState({
    title: "",
    videoLink: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("form data is: ", formData);
      const response = await axios.post(`${BASE_URL}/interviews`, formData);
      if (response.data.success) {
        setMessage("Interview created successfully!");
        setFormData({ title: "", videoLink: "", description: "" }); // Reset form
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded shadow-lg p-6 md:p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Create Interview
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="title" className="block text-gray-600 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter interview title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="videoLink" className="block text-gray-600 mb-2">
              Video Link
            </label>
            <input
              type="text"
              id="videoLink"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              placeholder="Enter video link"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="block text-gray-600 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter interview description"
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
          >
            Create Interview
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default CreateInterviewScreen;
