import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import 'react-toastify/dist/ReactToastify.css';
import CustomerHome from "./components/CustomerHome"
import RegisterRoom from "./components/RegisterRoom/RegisterRoom";
import AdminHome from "./components/AdminHome";
import AdministrativeHome from "./components/AdministrativeHome";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<MainScreen/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<CustomerHome />} />
            <Route path="/register-room" element={<RegisterRoom />} />
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/administrative' element={<AdministrativeHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
