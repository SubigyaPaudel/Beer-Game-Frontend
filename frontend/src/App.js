import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SignInHost from './components/SigninHost';
import Home from "./pages";
import Construction from "./pages/construction";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import Profile from "./components/Profile";
import GameSettings from "./pages/GameSettings";
import costumizingGames from "./pages/costumizingGames";
import LearnMore from "./pages/learnmore";
import "bootstrap/dist/css/bootstrap.min.css";
import Scrolltotop from "./components/ScrolltoTop";
import Player_Page from "./pages/Player/Player_Page";
import Instructor_Page from "./pages/Instructor/Instructor_Page";
import SignOut from './components/signout'

function App() {
  return (
    <Router>
      <Scrolltotop>
        <Switch>
          <Route path={["/", "/home"]} component={Home} exact />
          <Route path="/signin" component={SigninPage} exact />
          <Route path="/signup" component={SignupPage} exact />
          <Route path="/construction" component={Construction} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/GameSettings" component={GameSettings} exact />
          <Route path="/costumizingGames" component={costumizingGames} exact />
          <Route path="/learnmore" component={LearnMore} exact />
          <Route path="/instructor" component={Instructor_Page} />
          <Route path="/player" component={Player_Page} />
          <Route path='/sign_out' component = {SignOut}/>
        </Switch>
      </Scrolltotop>
    </Router>
  );
}

export default App;
