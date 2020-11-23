import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const authLogin = (state) => {
	return updateObject(state, { isAuthenticated: true });
};

const authLogout = (state) => {
	return updateObject(state, { isAuthenticated: false });
};

const switchAuthMode = (state) => {
	return updateObject(state, { isSignin: !state.isSignin });
};

const openChangePassModal = (state) => {
	return updateObject(state, { changePassIsOpen: true });
};

const closeChangePassModal = (state) => {
	return updateObject(state, { changePassIsOpen: false });
};

export const authReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.AUTH_LOGIN:
			return authLogin(state);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state);
		case actionTypes.SWITCH_AUTH_MODE:
			return switchAuthMode(state);
		case actionTypes.OPEN_CHANGE_PASSWORD_MODAL:
			return openChangePassModal(state);
		case actionTypes.CLOSE_CHANGE_PASSWORD_MODAL:
			return closeChangePassModal(state);
		default:
			return state;
	}
};
