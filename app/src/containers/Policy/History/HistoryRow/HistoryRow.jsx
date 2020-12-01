import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./HistoryRow.module.scss";

import Button from "../../../../components/UI/Button/Button";

const FileRow = ({
	id,
	timestamp,
	updatedBy,
	isCurrent,
	onRowClickHandler,
	onActivePrevPolicyHandler,
	openModalPreviousPolicyHandler,
}) => {
	return (
		<TableRow
			className={classes.HistoryRow}
			id={id}
			onClick={onRowClickHandler}
		>
			<TableCell component="th" scope="row" id={id}>
				{timestamp}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				{updatedBy}
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				<Button onButtonClick={openModalPreviousPolicyHandler} externalStyles="policyHistoryViewButton">View</Button>
			</TableCell>
			<TableCell component="th" scope="row" id={id}>
				<Button
					onButtonClick={onActivePrevPolicyHandler}
					disabled={!isCurrent}
					externalStyles="policyHistoryActivateButton"
				>
					Activate
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default FileRow;
