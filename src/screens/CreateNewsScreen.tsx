import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";

interface FormData {
  title: string;
  imageUrl: string;
  description: string;
  category: string;
}

const CreateNewsScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    imageUrl: "",
    description: "",
    category: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("form data is: ", formData);
      const response = await axios.post(`${BASE_URL}/news`, formData);
      if (response.data.success) {
        setMessage("News created successfully!");
        setFormData({ title: "", imageUrl: "", description: "", category: "" }); // Reset form
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded shadow-lg p-6 md:p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Create News
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
            Create News
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default CreateNewsScreen;
