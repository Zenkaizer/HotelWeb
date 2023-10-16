import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import Login from "./components/login/Login";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MainScreen/>}></Route>
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
