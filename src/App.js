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
import Credits from './components/Credits';

function App() {

  const [timerOn, setTimerOn] = useState(false)

  const [signIn, setSignIn] = useState('')

  const [apiKey, setApiKey] = useState('')
  const [taskName, setTaskName] = useState('')

  const [workspaceID, setWorspaceID] = useState(0)
  const [projectID, setProjectID] = useState(0)

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
              timerOn={timerOn}
              setTimerOn={setTimerOn}
              
              apiKey={apiKey}

              taskName={taskName}
              setTaskName={setTaskName}

              workspaceID={workspaceID}
              setWorspaceID={setWorspaceID}

              projectID={projectID}
              setProjectID={setProjectID}

            />

            <ClockifyTasksDisplay
              signIn={signIn}
              timerOn={timerOn}

              apiKey={apiKey}
              setApiKey={setApiKey}

              taskName={taskName}
              setTaskName={setTaskName}

              workspaceID={workspaceID}
              setWorspaceID={setWorspaceID}

              projectID={projectID}
              setProjectID={setProjectID}
            />
            <GoDownArrow 
              direction={'about-this'}
            />
            <AboutThis />

            <GoDownArrow 
              direction={'credits'}
            />
            <Credits />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
