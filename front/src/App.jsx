import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import Analytic from "./pages/Analytic";
import Chat from "./pages/Chat";
import Log from "./pages/Log";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Friend from "./pages/Friend";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/analytics" element={<Analytic/>}/>
        <Route path="/logs" element={<Log/>}/>
        <Route path="/chat/*" element={<Chat/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route element={<ProtectedLayout/>}>
          <Route path="/friends/*" element={<Friend/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
