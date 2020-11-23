import React, { useReducer } from "react";

import { PolicyContext } from "./policy-context";
import { policyReducer } from "./policy-reducers";

import * as actionTypes from "../actionTypes";

import policy from "../../data/currentPolicy.json";

export const PolicyState = ({ children }) => {
	const initialState = {
		id: policy.id,
		username: policy.userEmail,
		userEmail: policy.userEmail,
		timestamp: new Date().toUTCString(),
		policyFlagList: policy.policyFlagList,
		isPolicyChanged: false,
	};

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const changeToggle = (toggle) => {
		dispatch({ type: actionTypes.CHANGE_TOGGLE_POSITION, toggle });
	};

	const saveChanges = () => {
		dispatch({ type: actionTypes.SAVE_CHANGES_POLICY });
	};

	const cancelChanges = () => {
		dispatch({ type: actionTypes.CANCEL_CHANGES_POLICY });
	};

	return (
		<PolicyContext.Provider
			value={{
				id: policyState.id,
				user: policyState.username,
				email: policyState.userEmail,
				timestamp: policyState.timestamp,
				policyFlags: policyState.policyFlagList,
				isPolicyChanged: policyState.isPolicyChanged,
				changeToggle,
				saveChanges,
				cancelChanges,
			}}
		>
			{children}
		</PolicyContext.Provider>
	);
};
