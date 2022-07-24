import { useContext, useEffect, useRef } from "react";
import { ProtectedContext } from "../contexts/ProtectedContext";
import { AuthContext } from "../contexts/AuthContext";
 
export const useProtectedContext = () => {
  const context = useContext(ProtectedContext);
  if (context === undefined) {
    throw new Error("useProtectedContext must be used within a ProtectedProvider");
  }
  return context;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a UserProvider");
  }
  return context;
};

// export const useAdminContext = () => {
//   const context = useContext(AdminContext);
//   if (context === undefined) {
//     throw new Error("useAdminContext must be used within a AdminProvider");
//   }
//   return context;
// };

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

