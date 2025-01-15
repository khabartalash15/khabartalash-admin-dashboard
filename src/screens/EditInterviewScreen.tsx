import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const EditInterviewScreen = () => {
  const { id } = useParams(); // Get interview ID from URL

  const [formData, setFormData] = useState({
    title: "",
    videoLink: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch interview data by ID
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/interviews/${id}`);

        setFormData({
          title: res.data.interview.title,
          videoLink: res.data.interview.videoLink,
          description: res.data.interview.description,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load interview data.");
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/interviews/${id}`,
        formData
      );
      if (response.status === 200) {
        setMessage("Interview updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded shadow-lg p-6 md:p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Edit Interview
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Update Interview
            </button>
          </form>
        )}
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default EditInterviewScreen;
