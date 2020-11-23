import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./User.module.scss";

import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";

/*
import { ReactComponent as PadlockBodyIcon } from "../../../assets/padlock-body.svg";
import { ReactComponent as PadlockBarIcon } from "../../../assets/padlock-bar.svg";
import { ReactComponent as PadlockLockedIcon } from "../../../assets/padlock-body-locked.svg";
*/
import Input from "../../../components/UI/Input/Input";

const User = ({ name, email, group }) => {
	const [userName, setUserName] = useState(name);

	const changeInput = (name) => {
		setUserName(name);
	};

	return (
		<TableRow className={classes.User}>
			<TableCell>
				<Input
					type="text"
					value={userName}
					onChange={(evt) => changeInput(evt.target.value)}
				/>
			</TableCell>
			<TableCell>{email}</TableCell>
			<TableCell>{group}</TableCell>
			<TableCell>
				<TickIcon stroke="#73AE6F" />
				<DeleteIcon stroke="#D69598" />
			</TableCell>
		</TableRow>
	);
};

export default User;
