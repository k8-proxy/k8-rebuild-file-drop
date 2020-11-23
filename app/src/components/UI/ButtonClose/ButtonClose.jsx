import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/modal-close.svg";

import classes from "./ButtonClose.module.scss";

const ButtonClose = ({ onButtonClick, externalStyles }) => {
	return (
		<button
			data-test-id="buttonClose"
			type="button"
			onClick={onButtonClick}
			className={[classes.ButtonClose, externalStyles].join(" ")}
		>
			<CloseIcon />
		</button>
	);
};

export default ButtonClose;
