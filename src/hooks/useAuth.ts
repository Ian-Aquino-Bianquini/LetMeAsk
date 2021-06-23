import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const val = useContext(AuthContext);
  return val;
}
