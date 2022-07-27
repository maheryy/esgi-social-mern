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
import ProtectedAdmin from "./layouts/ProtectedAdmin";
import AuthProvider from "./services/contexts/AuthContext";
import Friend from "./pages/Friend";
import Discover from "./pages/Discover";
import UserEdit from "./pages/Admin/components/UserEdit";
import UserCreate from "./pages/Admin/components/UserCreate";
import MessageEdit from "./pages/Admin/components/MessageEdit";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProvider from "./services/contexts/AdminContext";

const App = () => { 
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytic/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          
          <Route element={<ProtectedLayout/>}>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/discover" element={<Discover/>}/>
            <Route path="/friends/*" element={<Friend/>}/>
            <Route path="/chat/:chatId" element={<Chat/>}/>
          </Route>

          <Route path="/admin" element={<ProtectedAdmin/>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user-list" element={<UsersList />} />
              <Route path="user-list/:id" element={<UserEdit />} />
              <Route path="user-list/add" element={<UserCreate />} />
              <Route path="message-list" element={<MessagesList />} />
              <Route path="message-list/:id" element={<MessageEdit />} />
              <Route path="logs-list" element={<LogsList />} />
          </Route>
        
          
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
