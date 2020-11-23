import { createContext } from "react";

export const GlobalStoreContext = createContext({
	title: "",
	fileFilterList: [],
	userfiles: [],
	riskFilterList: [],
	selectedFilters: [],
});
