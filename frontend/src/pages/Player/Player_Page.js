import Sidebar from "./components/sidebar";
import Player_Navbar from "./components/player_navbar";
import My_Games from "./components/my_games";
import MyInstructors from "./components/my_instructors";
import Settings from "./components/settings";
import GamePage from './components/Gamepage/index';
import "./Player_Page.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect
} from "react-router-dom";
import { useEffect } from "react";

const server_domain = "http://localhost:8000"; //change this if your django server runs at another address

const Player_Page = () => {
  document.addEventListener("DOMContentLoaded", () => {
    var body = document.querySelector("body");
    body.style.height = `${window.innerHeight}px`;
    body.style.width = `${window.innerWidth}px`;
    body.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
  });
  const { url, path } = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    window.scroll(0,0);
    //contact redux and check whether the user is authenticated or not, if they are
    //then allow them to proceed, if not redirect them to the landing page
  }, [path])
  return (
    <div className="App">
      <Sidebar />
      <div className="side_shift">
        <Player_Navbar />
        <div id="contents">
          <Switch>
            <Route exact path={`${path}/general_template`}>
              <h1 style={{ color: "white" }}>
                Place your place specific content here
              </h1>
            </Route>
            <Route exact path={`${path}/my_instructors`}>
              <MyInstructors />
            </Route>
            <Route exact path={`${path}/settings`}>
              <Settings />
            </Route>
            <Route exact path={`${path}/sign_out`} component={<Redirect to = "/"/>} />
            <Route path = {`${path}/gamepage/:id`}
            component = {GamePage}/>
            <Route exact path={`${path}`}>
              <My_Games />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Player_Page;
