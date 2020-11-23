import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./Current.module.scss";

import CurrentRow from "./CurrentRow/CurrentRow";
import RoutesForNonCompliantFiles from "../RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";

const Current = ({
	timestamp,
	id,
	email,
	policyFlags,
	changeToggle,
	currentPolicy,
	policy,
	isPolicyChanged,
	cancelChanges,
	saveChanges,
}) => {
	const [userDomain, setUserDomain] = useState("glasswallsolutions.com");
	return (
		<div className={classes.Current}>
			<div className={classes.header}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Timestamp</TableCell>
							<TableCell>Updated By</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tbody}>
						<TableRow>
							<TableCell id={currentPolicy ? id : policy.id}>
								{currentPolicy ? timestamp : policy.timestamp}
							</TableCell>
							<TableCell id={currentPolicy ? id : policy.id}>
								{currentPolicy ? email : policy.userEmail}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				{isPolicyChanged && (
					<div className={classes.buttons}>
						<Button
							externalStyles={classes.buttons}
							onButtonClick={cancelChanges}
						>
							Cancel Changes
						</Button>
						<Button
							externalStyles={classes.buttons}
							onButtonClick={saveChanges}
						>
							Save Changes
						</Button>
					</div>
				)}
			</div>
			<div className={classes.innerContent}>
				<h2 className={classes.head}>Content Flags</h2>
				<div className={classes.togglesBlock}>
					<div className={classes.block}>
						<h2>Word</h2>
						<CurrentRow
							testId="currentPolicySectionWord"
							block="word"
							itemList={policyFlags.word}
							onChangeHandler={changeToggle}
						/>
					</div>
					<div className={classes.block}>
						<h2>Excel</h2>
						<CurrentRow
							testId="currentPolicySectionExcel"
							block="excel"
							itemList={policyFlags.excel}
							onChangeHandler={changeToggle}
						/>
					</div>
					<div className={classes.block}>
						<h2>Powerpoint</h2>
						<CurrentRow
							testId="currentPolicySectionPowerpoint"
							block="powerpoint"
							itemList={policyFlags.powerpoint}
							onChangeHandler={changeToggle}
						/>
					</div>
					<div className={classes.block}>
						<h2>PDF</h2>
						<CurrentRow
							testId="currentPolicySectionPdf"
							block="pdf"
							itemList={policyFlags.pdf}
							onChangeHandler={changeToggle}
						/>
					</div>
				</div>
				<RoutesForNonCompliantFiles
					userDomain={userDomain}
					changeInput={setUserDomain}
				/>
				<PolicyForNonCompliantFiles />
			</div>
		</div>
	);
};

export default Current;
