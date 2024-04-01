import { useContext } from "react";
import { AuthContext } from "../providers/context/auth";

export default function useAuth() {
  return useContext(AuthContext);
}
