import { createContext, useState } from "react";
import { useContext } from "react";
export const HistoryContext = createContext();

export function HistoryComp({ children }) {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState();
  const [auth, setAuth] = useState();
  return (
    <HistoryContext.Provider
      value={{ data, setData, isClicked, setIsClicked, auth, setAuth }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
export const useHistoryContext = () => useContext(HistoryContext);
