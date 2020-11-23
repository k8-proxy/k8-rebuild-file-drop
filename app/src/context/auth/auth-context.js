import { createContext } from "react";

export const AuthContext = createContext({
	email: "",
	password: "",
});
