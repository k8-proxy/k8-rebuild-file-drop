import React, { useReducer } from "react";

import { FileDropContext } from "./fileDrop-context";
import { fileDropReducer } from "./fileDrop-reducers";

import * as actionTypes from "../actionTypes";

export const FileDropState = ({ children }) => {
	const initialState = {
		showModal: false,
		file: "",
		analysisReport: "",
		analysisReportString: "",
		validation: "",
		fileProcessed: false,
		loading: false,
		feedback: {},
	};

	const [fileDropState, dispatch] = useReducer(fileDropReducer, initialState);

	const setResultFromServer = (result) => {
		dispatch({ type: actionTypes.SET_RESULT_FROM_SERVER, result });
	};

	const resetState = () => {
		dispatch({ type: actionTypes.RESET_STATE });
	};

	return (
		<FileDropContext.Provider
			value={{
				showModal: false,
				analysisReport: fileDropState.analysisReport,
				analysisReportString: fileDropState.analysisReportString,
				validation: fileDropState.validation,
				file: fileDropState.file,
				fileProcessed: fileDropState.fileProcessed,
				loading: fileDropState.loading,
				feedback: fileDropState.feedback,
				setResultFromServer,
				resetState,
			}}
		>
			{children}
		</FileDropContext.Provider>
	);
};
