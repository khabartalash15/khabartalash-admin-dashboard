import axios from "axios";
import { useState, useEffect } from "react";
import { Interview } from "../utils/types";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const InterviewScreen = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const pageSize = 50;

  const fetchInterviews = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/interviews`, {
        params: { page, pageSize },
      });
      if (res.data) {
        setInterviews(res.data.data);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      }
    } catch (error) {
      console.error("Some error occurred while fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedInterviewId(id);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedInterviewId) return;

    try {
      const res = await axios.delete(
        `${BASE_URL}/interviews/${selectedInterviewId}`
      );
      setInterviews((prevInterviews) =>
        prevInterviews.filter(
          (item: Interview) => item._id !== selectedInterviewId
        )
      );
      setModalVisible(false);
      setSelectedInterviewId(null);
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  };

  const cancelDelete = () => {
    setSelectedInterviewId(null);
    setModalVisible(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Interview Management</h1>
        <button
          onClick={() => navigate(`${location.pathname}/create`)} // Dynamic navigation
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Interview
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Youtube link
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Edit
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((item: Interview) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.videoLink}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/interviews/${item._id}`)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this interview?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => fetchInterviews(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => fetchInterviews(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InterviewScreen;
