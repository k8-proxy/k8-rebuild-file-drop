import { updateObject } from "../../shared/updateObject";

import * as actionTypes from "../actionTypes";

const changeTogglePosition = (state, clickedToggle) => {
	const updatedList = updateObject(state.policyFlagList, {
		[clickedToggle.block]: state.policyFlagList[clickedToggle.block].map(
			(toggle) => {
				if (toggle.id === clickedToggle.id) {
					toggle.pos = clickedToggle.pos;
					toggle.touched = true;
				}
				return toggle;
			}
		),
	});

	return updateObject(state, {
		policyFlagList: updatedList,
		isPolicyChanged: true,
	});
};

const cancelChangesPolicy = (state) => {
	return updateObject(state, {
		policyFlagList: {
			word: [
				{ id: "word-id-1", name: "Dynamic Data Exchange", pos: "disallow" },
				{ id: "word-id-2", name: "Embedded Files", pos: "disallow" },
				{ id: "word-id-3", name: "Embedded Files", pos: "disallow" },
				{ id: "word-id-4", name: "External Hyperlinks", pos: "sanitise" },
				{ id: "word-id-5", name: "Internal Hyperlinks", pos: "disallow" },
				{ id: "word-id-6", name: "Macros", pos: "disallow" },
				{ id: "word-id-7", name: "Metadata", pos: "sanitise" },
				{ id: "word-id-8", name: "Review Comments", pos: "disallow" },
			],
			excel: [
				{ id: "excel-id-1", name: "Dynamic Data Exchange", pos: "disallow" },
				{ id: "excel-id-2", name: "Embedded Files", pos: "disallow" },
				{ id: "excel-id-3", name: "Embedded Files", pos: "sanitise" },
				{ id: "excel-id-4", name: "External Hyperlinks", pos: "sanitise" },
				{ id: "excel-id-5", name: "Internal Hyperlinks", pos: "disallow" },
				{ id: "excel-id-6", name: "Macros", pos: "sanitise" },
				{ id: "excel-id-7", name: "Metadata", pos: "disallow" },
				{ id: "excel-id-8", name: "Review Comments", pos: "disallow" },
			],
			powerpoint: [
				{ id: "powerpoint-id-1", name: "Embedded Files", pos: "disallow" },
				{ id: "powerpoint-id-2", name: "Embedded Images", pos: "disallow" },
				{
					id: "powerpoint-id-3",
					name: "External Hyperlinks",
					pos: "disallow",
				},
				{
					id: "powerpoint-id-4",
					name: "Internal Hyperlinks",
					pos: "sanitise",
				},
				{ id: "powerpoint-id-5", name: "Macros", pos: "disallow" },
				{ id: "powerpoint-id-6", name: "Metadata", pos: "sanitise" },
				{ id: "powerpoint-id-7", name: "Review Comments", pos: "disallow" },
			],
			pdf: [
				{ id: "pdf-id-1", name: "Acroform", pos: "sanitise" },
				{ id: "pdf-id-2", name: "Actions All", pos: "disallow" },
				{ id: "pdf-id-3", name: "Embedded Files", pos: "sanitise" },
				{ id: "pdf-id-4", name: "Embedded Images", pos: "disallow" },
				{ id: "pdf-id-5", name: "External Hyperlinks", pos: "disallow" },
				{ id: "pdf-id-6", name: "Internal Hyperlinks", pos: "disallow" },
				{ id: "pdf-id-7", name: "Javascript", pos: "disallow" },
				{ id: "pdf-id-8", name: "Metadata", pos: "sanitise" },
			],
		},

		isPolicyChanged: false,
	});
};

const saveChangesPolicy = (state) => {
	for (let key in state.policyFlagList) {
		state.policyFlagList[key].map((it) => {
			it.touched = false;
			return it.touched;
		});
	}

	return updateObject(state, {
		isPolicyChanged: false,
	});
};

export const policyReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_TOGGLE_POSITION:
			return changeTogglePosition(state, action.toggle);
		case actionTypes.SAVE_CHANGES_POLICY:
			return saveChangesPolicy(state);
		case actionTypes.CANCEL_CHANGES_POLICY:
			return cancelChangesPolicy(state);
		default:
			return state;
	}
};
