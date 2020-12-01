import React from "react";

import classes from "./SectionTitle.module.scss";

function SectionTitle({ externalStyles, children }) {
	return (
		<div className={[classes.SectionTitle, externalStyles].join(" ")}>
			{children}
		</div>
	);
}

export default SectionTitle;
