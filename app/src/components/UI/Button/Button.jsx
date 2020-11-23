import React from "react";
import classes from "./Button.module.scss";

const Button = ({
	testId,
	type,
	onButtonClick,
	buttonId,
	buttonType,
	externalStyles,
	buttonStyle,
	children,
	disabled,
}) => {
	return (
		<button
			data-test-id={testId}
			onClick={onButtonClick}
			className={[classes.button, externalStyles].join(" ")}
			style={buttonStyle}
			type={buttonType}
			id={buttonId}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
