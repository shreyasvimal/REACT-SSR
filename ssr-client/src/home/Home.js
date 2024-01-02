import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <p>I am in home page</p>
      <hr />
      <NavLink to="/cars">Messages</NavLink>;
    </div>
  );
}

export default Home;
