import BannerLogin from "./components/BannerLogin";
import GoDownArrow from "./components/GoDownArrow";
import Header from "./components/Header";
import MainPomodoro from "./components/MainPomodoro";
import StyleSelector from "./components/StyleSelector";

function App() {
  return (
    <>
      <Header />
      <BannerLogin />
      <MainPomodoro />
      <StyleSelector />
      <GoDownArrow />
    </>
  );
}

export default App;
