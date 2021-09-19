import AboutThis from "./components/AboutThis";
import BannerLogin from "./components/BannerLogin";
import GoDownArrow from "./components/GoDownArrow";
import Header from "./components/Header";
import MainPomodoro from "./components/MainPomodoro";

function App() {
  return (
    <>
      <Header />
      <BannerLogin />
      <MainPomodoro />
      <GoDownArrow />
      <AboutThis />
    </>
  );
}

export default App;
