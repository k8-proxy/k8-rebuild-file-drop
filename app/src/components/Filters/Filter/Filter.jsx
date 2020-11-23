import React, { useContext } from "react";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";

import { GlobalStoreContext } from "../../../context/globalStore/globalStore-context";

import classes from "./Filter.module.scss";

import CheckboxItem from "../../UI/Checkbox/Checkbox";

const Filter = ({ filter, checkboxList, externalStyles }) => {
	const { addFilterCheckbox } = useContext(GlobalStoreContext);

	const handleChange = (selectedCheckbox) => {
		addFilterCheckbox(selectedCheckbox);
	};

	const checkboxes = checkboxList.map(
		({ id, type, format, name, isChecked, titleColor }) => {
			return (
				<CheckboxItem
					key={id}
					type={type}
					label={format}
					name={name}
					checked={isChecked}
					filter={filter}
					backgroundColor={titleColor}
					onHandleChange={(evt) =>
						handleChange({
							value: format,
							filter: filter,
							id: id,
							checked: evt.target.checked,
							titleColor: titleColor,
						})
					}
				/>
			);
		}
	);

	return (
		<FormControl
			component="fieldset"
			className={[classes.Filter, externalStyles].join(" ")}
		>
			<FormLabel component="legend">
				{filter === "Risk" ? "" : filter}
			</FormLabel>
			<FormGroup
				className={classes.formGroup}
				style={{ flexDirection: "row" }}
			>
				{checkboxes}
			</FormGroup>
		</FormControl>
	);
};

export default Filter;
