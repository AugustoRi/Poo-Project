import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export const useAuth = () => {
  const { userData, getUserData, login } = useContext(AuthContext);

  return { userData, getUserData, login };
}