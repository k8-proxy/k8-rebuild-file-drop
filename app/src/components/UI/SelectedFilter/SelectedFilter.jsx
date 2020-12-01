import React from "react";

import classes from "./SelectedFilter.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

const SelectedFilter = ({ id, filter, value, titleColor, remove }) => {
	const clsFooter = [classes.footer];

	if (filter === "Risk") {
		clsFooter.push(classes.risk);
	}

	return (
		<div className={classes.SelectedFilter}>
			<div className={classes.header}>
				<h3>{filter}</h3>
				<ButtonClose
					color={"#b6bfc9"}
					externalStyles={classes.buttonClose}
					onButtonClick={() => remove({ id, filter })}
				/>
			</div>
			<div className={clsFooter.join(" ")}>
				<span style={{ backgroundColor: titleColor }}>{value}</span>
			</div>
		</div>
	);
};

export default SelectedFilter;
