import React from "react";

import classes from "./InfoBlock.module.scss";

const InfoBlock = ({ title, sum }) => {
	return (
		<div className={classes.InfoBlock}>
			<header>{title}</header>
			<span>{sum}</span>
		</div>
	);
};

export default InfoBlock;
