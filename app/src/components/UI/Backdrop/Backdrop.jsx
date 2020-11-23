import React from "react";

import classes from "./Backdrop.module.scss";

const Backdrop = ({ onClickOutside, externalStyles }) => (
	<div
		className={[classes.Backdrop, externalStyles].join(" ")}
		onClick={onClickOutside}
	></div>
);

export default Backdrop;
