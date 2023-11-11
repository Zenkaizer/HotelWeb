import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import 'react-toastify/dist/ReactToastify.css';
import CustomerHome from "./components/CustomerHome"
import Clients_managers from "./components/clients managers/Clients_managers"
import RegisterRoom from "./components/RegisterRoom/RegisterRoom";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MainScreen/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<CustomerHome />} />
            <Route path="/clients" element={<Clients_managers />} />
            <Route path="/register-room" element={<RegisterRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
