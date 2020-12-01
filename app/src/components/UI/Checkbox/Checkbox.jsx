import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

const Checkbox = ({
	label,
	onHandleChange,
	checked,
	filter,
	backgroundColor,
	checkboxIcon,
	checkedIcon,
}) => {
	let checkbox = null;

	if (filter === "Risk") {
		checkbox = (
			<MuiCheckbox
				disableRipple
				onChange={onHandleChange}
				checkedIcon={<span className={classes.icon} />}
				icon={<span className={classes.icon} />}
			/>
		);
	} else {
		checkbox = (
			<MuiCheckbox
				disableRipple
				onChange={onHandleChange}
				checked={checked}
				color="primary"
				checkedIcon={checkedIcon}
				icon={checkboxIcon}
			/>
		);
	}

	return (
		<FormControlLabel
			style={{ background: backgroundColor }}
			className={
				filter !== "Risk"
					? classes.Checkbox
					: [classes.Checkbox, classes.risk].join(" ")
			}
			label={label}
			labelPlacement={filter !== "Risk" ? "start" : "end"}
			control={checkbox}
		/>
	);
};

export default Checkbox;
