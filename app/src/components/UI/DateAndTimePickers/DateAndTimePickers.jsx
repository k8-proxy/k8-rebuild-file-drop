import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { DateTimePicker } from "@material-ui/pickers";

import classes from "./DateAndTimePickers.module.scss";
import Popup from "../Popup/Popup";

const defaultMaterialTheme = createMuiTheme({
	palette: {
		primary: { main: "#ffffff" },
	},
	overrides: {
		MuiInput: {
			input: {
				cursor: "pointer",
			},
		},
		MuiPickersDay: {
			daySelected: {
				backgroundColor: "#4592b0",
			},
		},
		MuiPickersClockNumber: {
			clockNumberSelected: {
				backgroundColor: "#4592b0",
			},
		},
	},
});

const DateAndTimePickers = ({ externalStyles }) => {
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const [pickerIsOpen, setPickerIsOpen] = useState(false);

	const [firstSelectedDate, setFirstSelectedDate] = useState(null);
	const [secondSelectedDate, setSecondSelectedDate] = useState(null);

	const timeIntervalList = [
		{
			name: "1 Hour",
			value: "hour",
		},
		{
			name: "12 Hours",
			value: "twelvehours",
		},
		{
			name: "24 Hours",
			value: "twentyfourhours",
		},
		{
			name: "Last 7 Days",
			value: "sevendays",
		},
		{
			name: "Custom Range",
			value: "customrange",
		},
	];

	const getIntervalTime = (int) => {
		switch (int) {
			case "hour":
				setFirstSelectedDate(new Date().setHours(new Date().getHours() - 1));
				break;
			case "twelvehours":
				setFirstSelectedDate(new Date().setHours(new Date().getHours() - 12));
				break;
			case "twentyfourhours":
				setFirstSelectedDate(new Date().setHours(new Date().getHours() - 24));
				break;
			case "sevendays":
				setFirstSelectedDate(
					new Date().setHours(new Date().getHours() - 168)
				);
				break;
			case "customrange":
				setPickerIsOpen(true);
				setFirstSelectedDate(new Date());
				break;
			default:
				setFirstSelectedDate(new Date());
				break;
		}
		setSecondSelectedDate(null);
		setPopupIsOpen(false);
	};

	return (
		<div className={[classes.DateAndTimePickers, externalStyles].join(" ")}>
			<button
				className={classes.intervalButton}
				onClick={() => setPopupIsOpen(true)}
			>
				Date/Time
			</button>

			<ThemeProvider theme={defaultMaterialTheme}>
				<DateTimePicker
					value={firstSelectedDate}
					InputProps={{ disableUnderline: true }}
					variant="inline"
					onChange={setFirstSelectedDate}
					disableFuture
					format="dd/MM/yyyy hh:mm a"
					autoOk
					open={pickerIsOpen}
					onOpen={() => setPickerIsOpen(true)}
					onClose={() => setPickerIsOpen(false)}
				/>
				<p>-</p>
				<DateTimePicker
					value={secondSelectedDate}
					InputProps={{ disableUnderline: true }}
					variant="inline"
					onChange={setSecondSelectedDate}
					disableFuture
					format="dd/MM/yyyy hh:mm a"
					autoOk
					disabled={!firstSelectedDate}
				/>
			</ThemeProvider>

			<CSSTransition
				in={popupIsOpen}
				timeout={300}
				mountOnEnter
				unmountOnExit
				classNames={{
					enter: classes.openPopupEnter,
					enterActive: classes.openPopupEnterActive,
					exit: classes.closePopupExit,
					exitActive: classes.closePopupExitActive,
				}}
			>
				<Popup
					links={timeIntervalList}
					externalStyles={classes.popup}
					closePopupHover={() => setPopupIsOpen(false)}
					onClickButton={(evt) => getIntervalTime(evt.currentTarget.value)}
				/>
			</CSSTransition>
		</div>
	);
};

export default DateAndTimePickers;
