import { Link } from "react-router-dom";
const DashboardScreen = () => {
  return (
    <main className="grid grid-cols-1 md:mt-64 md:grid-cols-2 gap-4 p-4">
      {/* Box 1 */}
      <Link
        to="/news"
        className="bg-gray-800 h-40 md:h-64 flex justify-center items-center text-white p-4 rounded shadow"
      >
        <h1 className="text-3xl font-semibold"> News</h1>
      </Link>
      {/* Box 2 */}
      <Link
        to="/interviews"
        className="bg-gray-800 h-40 md:h-64 flex justify-center items-center text-white p-4 rounded shadow"
      >
        <h1 className="text-3xl font-semibold"> Interviews</h1>
      </Link>
    </main>
  );
};

export default DashboardScreen;
