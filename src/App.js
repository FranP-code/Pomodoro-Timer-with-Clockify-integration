import React, {useState} from 'react'
import {firebase} from './components/Firebase/firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, updateDoc, getFirestore, collection, getDoc } from "firebase/firestore";

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
import Account from "./components/Account";
import ClockifyTasksDisplay from './components/ClockifyTasksDisplay';

function App() {

  const [signIn, setSignIn] = useState('')

  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {

      if (user) {
          setSignIn(true)
      } else {
          setSignIn(false)
      }

  })
    
  return (
    <Router>
      <>
        <Header 
          signIn={signIn}
        />
        
        <Switch>

          <Route path="/config-account">
              <Account />
          </Route>

          <Route path="/identify">
            <Identify />
          </Route>

          <Route path="/">
            <BannerLogin 
              signIn={signIn}
            />
            <MainPomodoro 
              signIn={signIn}
            />
            <ClockifyTasksDisplay
              signIn={signIn}
            />
            <GoDownArrow />
            <AboutThis />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
