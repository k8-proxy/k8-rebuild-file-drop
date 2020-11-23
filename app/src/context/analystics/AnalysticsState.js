import React, { useReducer } from "react";
import moment from "moment";

import { AnalysticsContext } from "./analystics-context";
import { analysticsReducer } from "./analystics-reducers";

import * as actionTypes from "../actionTypes";

export const AnalysticsState = ({ children }) => {
	const initialState = {
		start: moment().subtract(29, "days"),
		end: moment(),
	};

	const [analysticsState, dispatch] = useReducer(
		analysticsReducer,
		initialState
	);

	const changeDateRange = (start, end) => {
		dispatch({
			type: actionTypes.CHANGE_DATE_RANGE,
			payload: { start, end },
		});
	};

	return (
		<AnalysticsContext.Provider
			value={{
				startDate: analysticsState.start,
				endDate: analysticsState.end,
				changeDateRange,
			}}
		>
			{children}
		</AnalysticsContext.Provider>
	);
};
