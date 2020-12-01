import React, { useReducer } from "react";

import { GlobalStoreContext } from "./globalStore-context";
import { globalStoreReducer } from "./globalStore-reducers";

import * as actionTypes from "../actionTypes";

import userfiles from "../../data/userfiles.json";
import fileFilter from "../../data/filters/fileFilter.json";
import riskFilter from "../../data/filters/riskFilter.json";

const userfileList = userfiles;

export const GlobalStoreState = ({ children }) => {
	const initialState = {
		title: "Glasswall React App",
		userfiles: userfileList,
		fileFilter: fileFilter,
		riskFilter: riskFilter,
		isCurrentPolicy: true,
		selectedFilters: [],
	};

	const [globalStoreState, dispatch] = useReducer(
		globalStoreReducer,
		initialState
	);

	const changePageTitleHandler = (pageTitle) => {
		dispatch({ type: actionTypes.CHANGE_PAGE_TITLE, title: pageTitle });
	};

	const addFilterCheckbox = (filter) => {
		dispatch({ type: actionTypes.ADD_FILTER_FROM_CHECKBOXES, filter });
	};

	const addFilterInput = (filter) => {
		dispatch({ type: actionTypes.ADD_FILTER_FROM_INPUT, filter });
	};

	const removeFilter = (filter) => {
		dispatch({ type: actionTypes.REMOVE_FILTER, filter });
	};

	return (
		<GlobalStoreContext.Provider
			value={{
				state: globalStoreState,
				title: globalStoreState.title,
				userfiles: globalStoreState.userfiles,
				fileFilter: globalStoreState.fileFilter,
				riskFilter: globalStoreState.riskFilter,
				selectedFilters: globalStoreState.selectedFilters,
				isCurrentPolicy: globalStoreState.isCurrentPolicy,
				changePageTitleHandler,
				addFilterCheckbox,
				addFilterInput,
				removeFilter,
			}}
		>
			{children}
		</GlobalStoreContext.Provider>
	);
};
