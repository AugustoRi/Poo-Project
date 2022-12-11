import { createContext, useEffect, useState, useContext } from "react";

import axios from "axios";
import api from "../providers/services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const getDefaultUrl = async () => {
    let csrfURL = "http://127.0.0.1:8000/api/setcsrf/";
    const response = await axios.get(csrfURL, {withCredentials: true});
    return response;
  };

  useEffect(() => {
    getDefaultUrl();
  }, []);

  const getUserData = async () => {
    const response = axios.get("/perfil/", { withCredentials: true });
    console.log("perfil response", response.data)
    setUserData(response.data);
  };

  const login = async (payload) => {
    const url = "http://127.0.0.1:8000/login/";
    const response = await axios.post(url, payload);
    return response;
  };

  const signout = () => {
    setUserData(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ userData, getUserData, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};