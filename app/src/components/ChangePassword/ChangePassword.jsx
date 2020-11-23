import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./ChangePassword.module.scss";

import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const ChangePassword = ({ closeModal, externalStyles, isOpenModal }) => {
	const [passValue, setPassValue] = useState("");
	const [newPassValue, setNewPassValue] = useState("");
	const [confirmNewPassValue, setConfirmNewPassValue] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		closeModal();
	};

	return (
		<CSSTransition
			in={isOpenModal}
			timeout={500}
			mountOnEnter
			unmountOnExit
			classNames={{
				enter: classes.openEnter,
				enterActive: classes.openEnterActive,
				exit: classes.closeExit,
				exitActive: classes.closeExitActive,
			}}
		>
			<section className={[classes.ChangePassword, externalStyles].join(" ")}>
				<Modal externalStyles={classes.modal} onCloseHandler={closeModal}>
					<div className={classes.header}>
						<h2>Change Password</h2>
					</div>
					<form onSubmit={submitHandler}>
						<Input
							label="Current Password"
							type="password"
							name="currentPassword"
							externalStyles={classes.input}
							autofocus
							value={passValue}
							onChange={(evt) => {
								setPassValue(evt.target.value);
							}}
						/>
						<Input
							label="New Password"
							type="password"
							name="newPassword"
							externalStyles={classes.input}
							value={newPassValue}
							onChange={(evt) => {
								setNewPassValue(evt.target.value);
							}}
						/>
						<Input
							label="Confirm New Password"
							type="password"
							name="confirmNewPassword"
							externalStyles={classes.input}
							value={confirmNewPassValue}
							onChange={(evt) => {
								setConfirmNewPassValue(evt.target.value);
							}}
						/>
						<Button buttonType="submit" externalStyles={classes.button}>
							Save
						</Button>
					</form>
					<div className={classes.footer}></div>
				</Modal>
				<Backdrop
					onClickOutside={closeModal}
					externalStyles={classes.backdrop}
				/>
			</section>
		</CSSTransition>
	);
};

export default ChangePassword;
