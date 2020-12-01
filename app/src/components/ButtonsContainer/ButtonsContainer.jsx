import React from "react";

import classes from "./ButtonsContainer.module.scss";

function ButtonsContainer({ externalStyles, children }) {
	return (
		<div className={[classes.buttonsContainer, externalStyles].join(" ")}>
			{children}
		</div>
	);
}

export default ButtonsContainer;
