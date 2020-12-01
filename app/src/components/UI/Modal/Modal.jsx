import React from "react";

import classes from "./Modal.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

const Modal = ({ onCloseHandler, children, externalStyles }) => {
	return (
		<>
			<section className={[classes.Modal, externalStyles].join(" ")}>
				<ButtonClose
					externalStyles={classes.buttonClose}
					onButtonClick={onCloseHandler}
				/>
				{children}
			</section>
		</>
	);
};

export default Modal;
