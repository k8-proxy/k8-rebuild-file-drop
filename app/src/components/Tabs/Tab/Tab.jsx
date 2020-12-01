import React from "react";
import classes from "./Tab.module.scss";

const Tab = ({ isSelected, children }) => {
	if (isSelected) {
		return (
			<div className={classes.Tab}>
				<div className={classes.innerContent}>{children}</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Tab;
