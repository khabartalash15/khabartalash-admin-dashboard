import Navbar from "./components/Navbar";
import Container from "./components/Container";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
