import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

import classes from "./LoadingIndicator.module.scss";

function LoadingIndicator() {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && (
			<div className={classes.LoadingIndicator}>
				<div className={classes.spinner} />
			</div>
		)
	);
}

export default LoadingIndicator;
