import { useReducer, useState, createContext } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

  const {loggedUser, token} = useAuthContext();
  const navigate = useNavigate();


  useEffect(()=> {
    if(JSON.parse(localStorage.getItem('userInfo')) == null){
      navigate('/login', {replace:true});
    }else{
      navigate('/admin', {replace: true});
    }
  },
  [])

  return (
    <AdminContext.Provider
      value={{
        loggedUser,        
        token,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
