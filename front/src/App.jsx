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
import AuthProvider from "./services/contexts/AuthContext";
import Friend from "./pages/Friend";
import Discover from "./pages/Discover";
import UserEdit from "./pages/Admin/components/UserEdit";
import UserCreate from "./pages/Admin/components/UserCreate";
import MessageEdit from "./pages/Admin/components/MessageEdit";
import Dashboard from "./pages/Admin/Dashboard";

const App = () => { 
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/analytics" element={<Analytic/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          
          <Route element={<ProtectedLayout/>}>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/discover" element={<Discover/>}/>
            <Route path="/friends/*" element={<Friend/>}/>
            <Route path="/chat/:chatId" element={<Chat/>}/>
          </Route>

          <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="users-list" element={<UsersList />} />
          <Route path="users-list/:id" element={<UserEdit />} />
          <Route path="users-list/add" element={<UserCreate />} />
          <Route path="messages-list" element={<MessagesList />} />
          <Route path="messages-list/:id" element={<MessageEdit />} />
          <Route path="logs-list" element={<LogsList />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
