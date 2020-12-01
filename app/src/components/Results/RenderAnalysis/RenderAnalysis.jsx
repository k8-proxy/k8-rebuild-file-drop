import React from "react";
import classes from "./RenderAnalysis.module.scss";

import Items from "../Items";

function RenderAnalysis(props) {
	return (
		<div className={classes.RenderAnalysis}>
			<div className={classes.analysisTable}>
				<div className={classes.header}>
					Active content that has been sanitised (removed)
				</div>
				<table>
					<tbody>
						<Items items={props.sanitisations} />
					</tbody>
				</table>
			</div>

			<div className={classes.analysisTable}>
				<div className={classes.header}>
					Objects & Structures that have been repaired
				</div>
				<table>
					<tbody>
						<Items items={props.remediations} />
					</tbody>
				</table>
			</div>

			<div className={classes.analysisTable}>
				<div className={classes.header}>
					Objects & Structures that are unable to be repaired
				</div>
				<table>
					<tbody>
						<Items items={props.issues} />
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default RenderAnalysis;
