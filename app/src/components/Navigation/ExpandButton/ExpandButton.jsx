import React from "react";

import classes from "./ExpandButton.module.scss";

function ExpandButton({ clickHandler, expanded }) {
	return (
		<button
			className={`${classes.button}  ${expanded ? classes.expanded : ""}`}
			onClick={() => clickHandler()}
		>
			<div className={classes.version}>
				<span>ICAPv1.1.0</span>
				<span>Rebuild: v1.5</span>
			</div>
		</button>
	);
}

export { ExpandButton };
