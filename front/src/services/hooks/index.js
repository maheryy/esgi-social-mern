import { useContext, useEffect, useRef } from "react";
import { ProtectedContext } from "../contexts/Protected/ProtectedContext";

export const useProtectedContext = () => {
  const context = useContext(ProtectedContext);
  if (context === undefined) {
    throw new Error("useProtectedContext must be used within a ProtectedProvider");
  }
  return context;
};

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

