import React from "react";

import classes from "./IconButton.module.scss";

function IconButton({ externalStyles, children, onClick } = {}) {
	return (
		<button
			className={[classes.IconButton, externalStyles].join(" ")}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default IconButton;
