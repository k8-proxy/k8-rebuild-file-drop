import React from "react";

import classes from "./NavigationItem.module.scss";
import { NavLink, Link } from "react-router-dom";

const NavigationItem = ({
	testId,
	path,
	icon,
	exact,
	clicked,
	notActive,
	children,
}) => {
	let link = (
		<NavLink			
			to={path}
			activeClassName={classes.active}
			exact={exact}
			onClick={clicked}
			style={{
				backgroundImage: `url(${icon})`,
			}}
		>
			{children}
		</NavLink>
	);

	if (notActive) {
		link = (
			<Link data-test-id={testId} to={path} className={classes.notActive}>
				{children}
			</Link>
		);
	}

	return <li className={classes.NavigationItem}>{link}</li>;
};

export default NavigationItem;
