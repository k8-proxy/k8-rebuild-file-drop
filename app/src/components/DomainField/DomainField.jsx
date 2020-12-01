import React from "react";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./DomainField.module.scss";
import { ReactComponent as TickIcon } from "../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon-white.svg";

import Input from "../UI/Input/Input";

const DomainField = ({ name, onChangeInputHandler, disabled }) => {
	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>API URL</TableCell>
					<TableCell>Validated</TableCell>
				</TableRow>
			</TableHead>
			<TableBody className={classes.tbody}>
				<TableRow className={classes.domainRow}>
					<TableCell>
						<Input
							testId="inputApiUrl"
							type="text"
							value={name}
							onChange={onChangeInputHandler}
							disabled={disabled}
						/>
					</TableCell>
					<TableCell>
						<TickIcon stroke="#73AE6F" />
						<DeleteIcon stroke="#D69598" />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default DomainField;
