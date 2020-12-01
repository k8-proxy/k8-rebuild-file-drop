import React from "react";

import classes from "./Input.module.scss";

const Input = ({
	testId,
	label,
	type,
	name,
	value,
	style,
	externalStyles,
	onChange,
	placeholder,
	autofocus,
	disabled,
}) => {
	return (
		<div className={[classes.Input, externalStyles].join(" ")}>
			<label htmlFor={name}>{label}</label>
			<input
				data-test-id={testId}
				style={style}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				autoFocus={autofocus}
				disabled={disabled}
			/>
		</div>
	);
};

export default Input;
