import React, { useContext } from "react";
import { GlobalStoreContext } from "../../../context/globalStore/globalStore-context";

import classes from "./NavigationItems.module.scss";

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ expanded, items, externalStyles }) => {
	const { changePageTitleHandler } = useContext(GlobalStoreContext);

	const cls = [classes.NavigationItems, externalStyles];
	if (expanded) {
		cls.push(classes.menuExpanded);
	}

	const links = items.map((it) => {
		return (
			<NavigationItem
				key={it.id}
				path={it.link}
				icon={it.icon}
				exact={it.exact}
				notActive={it.notActive}
				clicked={() => {
					changePageTitleHandler(it.name);
				}}
			>
				<div>
					<p data-test-id={it.testId}>{it.name}</p>
				</div>
			</NavigationItem>
		);
	});

	return (
		<nav className={cls.join(" ")}>
			<ul>{links}</ul>
		</nav>
	);
};

export default NavigationItems;
