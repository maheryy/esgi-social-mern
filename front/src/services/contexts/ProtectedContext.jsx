import { useReducer, useState, createContext, useEffect } from "react";
import chatReducer from "../reducers/chat";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";


export const ProtectedContext = createContext();

const ProtectedProvider = ({ children }) => {
  const [chats, dispatchChats] = useReducer(chatReducer, []);
  const [extendedSidebar, setExtendedSidebar] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);
  const {loggedUser, token} = useAuthContext();
  const navigate = useNavigate();


  useEffect(()=> {
    if(JSON.parse(localStorage.getItem('userInfo')) == null){
      navigate('/login', {replace:true});
    }else{
      navigate('/friends', {replace: true});
    }
  },
  [])
  
  

  return (
    <ProtectedContext.Provider
      value={{
        chats,
        dispatchChats,
        extendedSidebar,
        setExtendedSidebar,
        selectedChat,
        setSelectedChat,
        loggedUser,
        token,
        
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
};

export default ProtectedProvider;
