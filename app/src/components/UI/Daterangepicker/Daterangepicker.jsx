import React, { useContext } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./daterangepicker.scss";

import { AnalysticsContext } from "../../../context/analystics/analystics-context";

import classes from "./Daterangepicker.module.scss";

const Daterangepicker = ({ externalStyles }) => {
	const { startDate, endDate, changeDateRange } = useContext(
		AnalysticsContext
	);

	const label =
		startDate.format("DD/MM/YYYY hh:mm A") +
		" - " +
		endDate.format("DD/MM/YYYY hh:mm A");

	return (
		<div className={[classes.Daterangepicker, externalStyles].join(" ")}>
			<div className={classes.intervalButton}>Date/Time</div>
			<DateRangePicker
				initialSettings={{
					timePicker: true,
					startDate: startDate.toDate(),
					endDate: endDate.toDate(),
					locale: {
						format: "DD/MM/YYYY hh:mm A",
					},
					ranges: {
						"1 Hour": [
							moment().subtract(1, "hour").toDate(),
							moment().toDate(),
						],
						"12 Hours": [
							moment().subtract(12, "hour").toDate(),
							moment().toDate(),
						],
						"24 Hours": [
							moment().subtract(24, "hour").toDate(),
							moment().toDate(),
						],
					},
				}}
				onCallback={changeDateRange}
			>
				<div
					data-test-id="dateRangePicker"
					id="reportrange"
					className={classes.reportrange}
				>
					<span>{label}</span>
				</div>
			</DateRangePicker>
		</div>
	);
};

export default Daterangepicker;
