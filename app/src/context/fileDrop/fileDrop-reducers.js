import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const setResultFromServer = (state, result) => {
	return updateObject(state, {
		analysisReport: result.analysisReport,
		analysisReportString: result.analysisReportString,
		file: result.file,
		fileProcessed: result.fileProcessed,
	});
};

const resetState = (state) => {
	return updateObject(state, {
		showModal: false,
		file: "",
		analysisReport: "",
		analysisReportString: "",
		validation: "",
		fileProcessed: false,
		loading: false,
		feedback: {},
	});
};

export const fileDropReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_RESULT_FROM_SERVER:
			return setResultFromServer(state, action.result);
		case actionTypes.RESET_STATE:
			return resetState(state);
		default:
			return state;
	}
};
