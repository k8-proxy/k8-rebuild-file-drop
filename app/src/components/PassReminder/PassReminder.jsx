import React, { useState } from "react";
import { Link } from "react-router-dom";

//import ReCAPTCHA from "react-google-recaptcha";

import { ReactComponent as IconPass } from "../../assets/password-icon.svg";
import iconUser from "../../assets/user-icon.svg";

import classes from "./PassReminder.module.scss";

import GlasswallLogo from "../GlasswallLogo/GlasswallLogo";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const PassReminder = ({ onLoginHandler }) => {
	const [emailValue, setEmailValue] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		console.log("Send link");
	};

	//const onSuccessComplete = () => {
	//	console.log("ReCAPTCHA is success");
	//};
	return (
		<>
			<GlasswallLogo className={classes.logo} />
			<section className={classes.PassReminder}>
				<h2 className={classes.heading}>
					<IconPass className={classes.iconPass} viewBox={"0 0 44 44"} />
					Forgotten Password
				</h2>
				<p className={classes.message}>
					Please enter the email address associated with your account. A link
					will be sent to the email address, allowing you to create a new
					password.
				</p>
				<form onSubmit={submitHandler}>
					<Input
						data-test-id="inputEmail"
						type="email"
						name="email"
						placeholder="Email address"
						style={{
							backgroundImage: `url(${iconUser})`,
						}}
						value={emailValue}
						onChange={(evt) => {
							setEmailValue(evt.target.value);
						}}
					/>
					{/*<ReCAPTCHA
						className={classes.recaptcha}
						sitekey={process.env.REACT_APP_RECAPTCHA_API_KEY}
						onChange={onSuccessComplete}
					/>*/}
					<div className={classes.wrapButtons}>
						<Link to={"/"}>
							<Button data-test-id="buttonCancel" onButtonClick={onLoginHandler}>Cancel</Button>
						</Link>
						<Button data-test-id="buttonSendLink" buttonType={"submit"}>Send link</Button>
					</div>
				</form>
			</section>
		</>
	);
};

export default PassReminder;
