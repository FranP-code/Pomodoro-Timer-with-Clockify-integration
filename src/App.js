import AboutThis from "./components/AboutThis";
import BannerLogin from "./components/BannerLogin";
import GoDownArrow from "./components/GoDownArrow";
import Header from "./components/Header";
import MainPomodoro from "./components/MainPomodoro";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Identify from "./components/Identify";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/identify">
            <Identify />
          </Route>
          <Route path="/">
            <BannerLogin />
            <MainPomodoro />
            <GoDownArrow />
            <AboutThis />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
