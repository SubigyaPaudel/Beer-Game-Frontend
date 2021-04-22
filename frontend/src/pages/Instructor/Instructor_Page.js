import Sidebar from "./components/sidebar";
import Instructor_Navbar from "./components/instructor_navbar";
import My_Games from "./components/my_games";
import EditGames from "./components/edit_games";
import MyStudents from "./components/my_students";
import DefaultGame from "./components/default_game";
import CreateNewGame from "./components/create_new_game";
import CreateDemandPattern from "./components/create_demand_patterns";
import "./Instructor_Page.css";
import { BrowserRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom";

const server_domain = "http://localhost:8000"; //change this if your django server runs at another address

const Instructor_Page = () => {
  var body = document.querySelector("body");
  body.style.height = `${window.innerHeight}px`;
  body.style.width = `${window.innerWidth}px`;
  body.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
  const {url, path} = useRouteMatch();
  return (
    <div className="Instructor_Page">
        <Sidebar />
        <div className="side_shift">
          <Instructor_Navbar server_domain={server_domain} />
          <div id="contents">
            <Switch>
              <Route exact path={`${path}/general_template`}>
                <h1 style={{ color: "white" }}>
                  Place your place specific content here
                </h1>
              </Route>
              <Route exact path={`${path}/edit_game/:game_id`}>
                <EditGames />
              </Route>
              <Route exact path = {`${path}/my_students`}>
                <MyStudents />
              </Route>
              <Route exact path={`${path}/my_default_game`}>
                <DefaultGame />
              </Route>
              <Route exact path={`${path}/create_new_game`}>
                <CreateNewGame />
              </Route>
              <Route
                exact
                path="/sign_out"
                render={() => (window.location = server_domain + "/logout/")}
              />
              <Route exact path={`${path}/create_demand_patterns`}>
                <CreateDemandPattern/>
              </Route>
              <Route exact path={`${path}`}>
                <My_Games />
              </Route>
            </Switch>
          </div>
        </div>
    </div>
  );
};

export default Instructor_Page;