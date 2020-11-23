import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth/auth-context";

import classes from "./Login.module.scss";

import iconUser from "../../assets/user-icon.svg";
import iconPass from "../../assets/password-icon.svg";

import Button from "../UI/Button/Button";
import GlasswallLogo from "../GlasswallLogo/GlasswallLogo";
import Input from "../UI/Input/Input";

const Login = () => {
	const { login } = useContext(AuthContext);

	const [emailValue, setEmailValue] = useState("");
	const [passValue, setPassValue] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		login();
	};
	return (
		<>
			<GlasswallLogo className={classes.logo} />
			<section className={classes.login}>
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
					<Input
						data-test-id="inputPassword"
						type="password"
						name="password"
						placeholder="Password"
						style={{
							backgroundImage: `url(${iconPass})`,
						}}
						value={passValue}
						onChange={(evt) => {
							setPassValue(evt.target.value);
						}}
					/>
					<p className={classes.linkTerms}>
						By logging in your agree to the &nbsp;
						<a href="/">terms of use</a>
					</p>
					<Button data-test-id="buttonLogin" buttonType={"submit"}>Log In</Button>
				</form>
				<p className={classes.rePassLink}>
					<Link data-test-id="linkForgottenPassword" to={"/pass-reminder"}>Forgotten your password?</Link>
				</p>
				<p className={classes.rePassLink}>
					<Link to={"/sow"}>SOW Checklist</Link>
				</p>
			</section>
		</>
	);
};

export default Login;
