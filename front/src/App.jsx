import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin/Admin";
import UsersList from "./pages/Admin/UsersList";
import MessagesList from "./pages/Admin/MessagesList";

import LogsList from "./pages/Admin/LogsList";
import "./App.css";
import Analytic from "./pages/Analytic";
import Chat from "./pages/Chat";
import Log from "./pages/Log";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Friend from "./pages/Friend";
import Discover from "./pages/Discover";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/analytics" element={<Analytic/>}/>
        <Route path="/logs" element={<Log/>}/>
        <Route path="/chat/*" element={<Chat/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route element={<ProtectedLayout/>}>
          <Route path="/discover" element={<Discover/>}/>
          <Route path="/friends/*" element={<Friend/>}/>
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="users-list" element={<UsersList />} />
          <Route path="messages-list" element={<MessagesList />} />
          <Route path="logs-list" element={<LogsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
