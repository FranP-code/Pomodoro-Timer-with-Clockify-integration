import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutThis from "./components/AboutThis";
import Account from "./components/Account";
import BannerLogin from "./components/BannerLogin";
import ClockifyTasksDisplay from './components/ClockifyTasksDisplay';
import Credits from './components/Credits';
import Footer from './components/Footer';
import GoDownArrow from "./components/GoDownArrow";
import Header from "./components/Header";
import Identify from "./components/Identify";
import MainPomodoro from "./components/MainPomodoro";

function App() {

  const [timerOn, setTimerOn] = useState(false)

  const [signIn, setSignIn] = useState('')

  const [apiKey, setApiKey] = useState('')
  const [taskName, setTaskName] = useState('')

  const [workspaceID, setWorspaceID] = useState(0)
  const [projectID, setProjectID] = useState(0)

  const [darkMode, setDarkmode] = useState(false)

  const [KonamiCodeActive, setKonamiCodeActive] = useState(false)

  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {

      if (user) {
          setSignIn(true)
      } else {
          setSignIn(false)
      }

  })

  const root = document.getElementById('root')

  if (window.location.href.split('/')[3].includes('identify') || window.location.href.split('/')[3].includes('config-account')) {
      
      root.style.height = '100%'
      root.style.display = 'flex'
      root.style.flexDirection ='column'
      
  }
  
  return (
    <Router>
      <>
        <Header 
          signIn={signIn}

          darkMode={darkMode}
          setDarkmode={setDarkmode}

          KonamiCodeActive= {KonamiCodeActive}
        />
        
        <Switch>



          <Route path="/config-account">
              <Account
              
                darkMode={darkMode}
              />
          </Route>

          <Route path="/identify">
            <Identify

              darkMode={darkMode}
            />
          </Route>

          <Route path="/">
            <BannerLogin 
              signIn={signIn}
              darkMode={darkMode}
            />

            <ClockifyTasksDisplay

              setTimerOn={setTimerOn}

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
              
              darkMode={darkMode}
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

              darkMode={darkMode}

              setKonamiCodeActive = {setKonamiCodeActive}
              KonamiCodeActive= {KonamiCodeActive}
            />

            <GoDownArrow 
              direction={'about-this'}
              darkMode={darkMode}

            />
            <AboutThis
              darkMode={darkMode}

            />

            <GoDownArrow 
              direction={'credits'}
              darkMode={darkMode}

            />
            <Credits
              darkMode={darkMode}
          />
          </Route>
        </Switch>

        <Footer
          darkMode={darkMode}

        />
      </>
    </Router>
  );
}

export default App;
