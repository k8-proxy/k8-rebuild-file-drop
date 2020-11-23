import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import classes from "./TabNav.module.scss";

const TabNav = ({ tabs, isSelectedTab, onSetActiveTabHandler, children }) => {
	const tabNav = tabs.map((tab) => {
		const clsButton = [classes.button];
		const clsLink = [classes.link];
		let icon = tab.icon;

		if (tab.name === isSelectedTab) {
			clsLink.push(classes.active);
			clsButton.push(classes.active);
			//icon = tab.iconSelected;
		}

		return (
			<CSSTransition
				key={tab.name}
				timeout={300000}
				mountOnEnter
				unmountOnExit
				classNames={{
					enter: classes.tabEnter,
					enterActive: classes.tabEnterActive,
					enterDone: classes.tabEnterDone,
					exit: classes.tabExit,
					exitActive: classes.tabExitActive,
					exitDone: classes.tabExitDone,
				}}
			>
				<li className={clsLink.join(" ")}>
					<button
						data-test-id={tab.testId}
						className={clsButton.join(" ")}
						onClick={() => onSetActiveTabHandler(tab.name)}
					>
						{icon ? <img src={icon} alt={tab.name} /> : null}
						{tab.name}
					</button>
				</li>
			</CSSTransition>
		);
	});

	return (
		<div className={classes.TabNav}>
			<TransitionGroup component={"ul"}>{tabNav}</TransitionGroup>
			<div className={classes.tabwrap}>{children}</div>
		</div>
	);
};

export default TabNav;
