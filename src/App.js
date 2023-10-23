import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MainScreen/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
