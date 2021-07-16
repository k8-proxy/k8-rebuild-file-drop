import React from "react";

import classes from "./ExpandButton.module.scss";
// sdkApiVersion
// 				sdkEngineVersion
function ExpandButton({ data, clickHandler, expanded }) {
	return (
		<button
			className={`${classes.button}  ${expanded ? classes.expanded : ""}`}
			onClick={() => clickHandler()}
		>
			<div className={classes.version}>
				{/* <span>ICAPv1.1.0</span>
				<span>Rebuild: v1.5</span> */}
				<span>SDKAPI: {data && data.sdkApiVersion}</span>
				<span>SDKEngine: { data && data.sdkEngineVersion}</span>
				
			</div>
		</button>
	);
}

export { ExpandButton };
