import React from "react";

import classes from "./ExpandButton.module.scss";

function ExpandButton({ data, clickHandler, expanded }) {
	return (
		<button
			className={`${classes.button}  ${expanded ? classes.expanded : ""}`}
			onClick={() => clickHandler()}
		>
			<div className={classes.version}>
				<span>SDKAPI: {data && data.sdkApiVersion}</span>
				<span>SDKEngine: { data && data.sdkEngineVersion}</span>
				
			</div>
		</button>
	);
}

export { ExpandButton };
