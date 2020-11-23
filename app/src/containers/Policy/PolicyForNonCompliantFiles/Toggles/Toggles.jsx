import React from "react";

import classes from "./Toggles.module.scss";

const Toggles = ({ nameBlock }) => {
	return (
		<div className={classes.Toggles}>
			<form method="post" action="">
				<div className={classes.input}>
					<input data-test-id={`input-${nameBlock}-Relay`} id={`relay-${nameBlock}`} type="radio" name="toggle" />
					<label htmlFor={`relay-${nameBlock}`}>
						{" "}
						<strong>Relay </strong>- The unmodified original file should be
						relayed
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id={`input-${nameBlock}-Block`} id={`block-${nameBlock}`} type="radio" name="toggle" />
					<label htmlFor={`block-${nameBlock}`}>
						{" "}
						<strong>Block </strong>- The original file should be blocked. An
						Error report should be constructed using the template included in
						the Adaption Policy.
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id={`input-${nameBlock}-Refer`} id={`refer-${nameBlock}`} type="radio" name="toggle" />
					<label htmlFor={`refer-${nameBlock}`}>
						{" "}
						<strong>Refer </strong>- The document it is submitted to the
						'Non-compliant File Service' (see section 1.4.5 Non-compliant File
						Service). The return information from this call is then used to
						construct the Transaction Outcome message.
					</label>
				</div>
			</form>
		</div>
	);
};

export default Toggles;
