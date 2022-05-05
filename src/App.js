import './styles.css'

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import ConfigAccount from "./pages/ConfigAccount/ConfigAccount";
import Identify from "./pages/Identify/Identify";
import Main from './pages/Main/Main';
import AboutThis from "./pages/AboutThis/AboutThis";
import Credits from './pages/Credits/Credits';

import Footer from './components/Footer/Footer';
import Header from "./components/Header/Header";

function App() {

  const [signedIn, setSignedIn] = useState('')
  const [darkMode, setDarkmode] = useState(false)
  const [konamiCodeActive, setKonamiCodeActive] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState(undefined)

  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {

      if (user) {
        setSignedIn(true)
      } else {
        setSignedIn(false)
      }

  })

  const root = document.getElementById('root')

  if (window.location.href.split('/')[3].includes('identify') || window.location.href.split('/')[3].includes('config-account')) {
      
      root.style.height = '100%'
      root.style.display = 'flex'
      root.style.flexDirection ='column'
      
  }

  React.useEffect(() => {
    const permission = localStorage.getItem("notification-permission")

    if (permission !== undefined && permission !== null) {
      setNotificationPermission(permission === "true" ? true : false)      
    }
  }, [])
  
  return (
    <Router>
      <>
        <Header 
          signedIn={signedIn}

          darkMode={darkMode}
          setDarkmode={setDarkmode}

          konamiCodeActive={konamiCodeActive}

          notificationPermission={notificationPermission}
          setNotificationPermission={setNotificationPermission}
        />
        
        <Switch>
          <Route path="/config-account">
              <ConfigAccount
                darkMode={darkMode}
              />
          </Route>

          <Route path="/identify">
            <Identify darkMode={darkMode}/>
          </Route>

          <Route path="/">
            <Main
              signedIn={signedIn}
              darkMode={darkMode}
              
              konamiCodeActive={konamiCodeActive}
              setKonamiCodeActive={setKonamiCodeActive}
              notificationPermission={notificationPermission}
            />
            <AboutThis
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
