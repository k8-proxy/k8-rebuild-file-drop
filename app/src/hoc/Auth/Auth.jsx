import React from "react";

import classes from "./Auth.module.scss";

const Auth = ({ children }) => {
	return <section className={classes.Auth}>{children}</section>;
};

export default Auth;
