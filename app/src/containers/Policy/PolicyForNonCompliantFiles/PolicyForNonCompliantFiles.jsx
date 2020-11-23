import React from "react";

import classes from "./PolicyForNonCompliantFiles.module.scss";
import Toggles from "./Toggles/Toggles";

const PolicyForNonCompliantFiles = () => {
	return (
		<div className={classes.PolicyForNonCompliantFiles}>
			<h2 className={classes.head}>Policy for non-compliant files</h2>
			<section className={classes.info}>
				<div>
					<h3>
						<strong>Un-Processable File Types</strong>{" "}
					</h3>
					<p>
						When the filetype of the original file is identified as one that
						the Glasswall SDK cannot rebuild.
					</p>
				</div>
				<div>
					<h3>
						<strong>Glasswall Blocked Files</strong>
					</h3>
					<p>The original file cannot be rebuilt by the Glasswall SDK</p>
				</div>
			</section>
			<section className={classes.wrapBlocksToggle}>
				<h3 className={classes.blockToggleHead}>
					<strong>Un-Processable File Types</strong>
				</h3>
				<Toggles nameBlock="Un-Processable-File-Types" />
				<h3 className={classes.blockToggleHead}>
					<strong>Glasswall Blocked Files</strong>
				</h3>
				<Toggles nameBlock="Glasswall-Blocked-Files" />
			</section>
		</div>
	);
};

export default PolicyForNonCompliantFiles;
