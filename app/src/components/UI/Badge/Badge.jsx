import React from "react";
import classes from "./Badge.module.scss";

const Badge = ({ value, externalStyles }) => {
	const cls = [classes.Badge, externalStyles];
	return <span className={cls.join(" ")}>{value}</span>;
};

export default Badge;
