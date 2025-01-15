import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const EditNewsScreen = () => {
  const { id } = useParams(); // Get news ID from URL

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch news data by ID
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/news/${id}`);
        setFormData({
          title: res.data.news.title,
          imageUrl: res.data.news.imageUrl,
          description: res.data.news.description,
          category: res.data.news.category,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load news data.");
        setLoading(false);
      }
    };

    fetchNews();
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
      const response = await axios.put(`${BASE_URL}/news/${id}`, formData);
      if (response.status === 200) {
        setMessage("News updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded shadow-lg p-6 md:p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit News</h1>
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
                placeholder="Enter news title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl" className="block text-gray-600 mb-2">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="block text-gray-600 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
              >
                <option value="">Select category</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
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
                placeholder="Enter news description"
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Update News
            </button>
          </form>
        )}
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default EditNewsScreen;
