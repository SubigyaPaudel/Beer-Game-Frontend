import "./sidebar.css";
import { Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";


/**
 * Renders the sidebar for the instructor page
 */
const Sidebar = () => {

  useEffect(() => {
      document.getElementById("sidebar").style.height = `${window.innerHeight}px`;
  }, []);

  function openNav() {
    console.log("hello");
    var sidebar = document.getElementById("sidebar");
    sidebar.style.animation = "expand";
    sidebar.style.animationDuration = "0.6s";
    sidebar.style.animationDirection = "normal";
    sidebar.style.animationIterationCount = "1";
    sidebar.style.animationPlayState = "running";
    document.querySelectorAll(".side_shift").forEach((element) => {
      element.style.animation = "shift_left";
      element.style.animationDuration = "0.3s";
      element.style.animationDirection = "normal";
      element.style.animationIterationCount = "1";
      element.style.animationPlayState = "running";
      element.onanimationend = (event) => {
        event.target.style.marginLeft = "20%";
        event.target.style.opacity = "0.5";
      };
    });
    sidebar.onanimationend = (event) => {
      event.target.style.width = "20%";
      event.target.style.backgroundColor = "white";
    };
    document.querySelectorAll(".sidebar_options").forEach((element) => {
      element.style.visibility = "visible";
    });
  }

  function closeNav() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.animation = "shrink";
    sidebar.style.animationDuration = "0.2s";
    sidebar.style.animationDirection = "normal";
    sidebar.style.animationIterationCount = "1";
    document.querySelectorAll(".side_shift").forEach((element) => {
      element.style.animation = "shift_back";
      element.style.animationDuration = "0.1s";
      element.style.animationDirection = "normal";
      element.style.animationIterationCount = "1";
      element.style.animationPlayState = "running";
      element.onanimationend = (event) => {
        event.target.style.marginLeft = "0%";
        event.target.style.opacity = "0.9";
      };
    });
    sidebar.style.animationPlayState = "running";
    sidebar.onanimationend = (event) => {
      event.target.style.width = "20px";
      event.target.style.backgroundColor = "black";
    };
    document.querySelectorAll(".sidebar_options").forEach((element) => {
      element.style.visibility = "hidden";
    });
  }

  const {url, path} = useRouteMatch();

  return (
    <div
      id="sidebar"
      onMouseEnter={openNav}
      onMouseLeave={closeNav}
      onClick={openNav}
    >
      <div id="container_user_options" className="sidebar_options">
        <h1 className="sidebar_options">My options</h1>
        <Link to={`${path}`}>
          <h2 className="sidebar_options">My Games</h2>
        </Link>

        <Link to={`${path}/my_students`}>
          <h2 className="sidebar_options">My Students</h2>
        </Link>

        <Link to={`${path}/my_default_game`}>
          <h2 className="sidebar_options">Change my default game</h2>
        </Link>

        <Link to={`${path}/create_new_game`}>
          <h2 className="sidebar_options">Create New Game</h2>
        </Link>

        <Link to = {`${path}/create_demand_patterns`}>
          <h2 className="sidebar_options">Demand Patterns</h2>
        </Link>
      </div>
      <div id="container_site_options" className="sidebar_options">
        <h1 className="sidebar_options">Site options</h1>
        <h2 className="sidebar_options">
          <Link to={`${path}/my_default_game`}>Settings</Link>
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
