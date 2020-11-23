import React from "react";

import classes from "./UserLink.module.scss";

import AccountIcon from "../../../assets/svg/account-icons/account-name-icon.svg";

const UserLink = ({
	username,
	expanded,
	openPopup,
	closePopup,
	externalStyles,
}) => {
	const cls = [classes.UserLink, externalStyles];
	if (expanded) {
		cls.push(classes.userLinkExpanded);
	}

	return (
		<section
			className={cls.join(" ")}
			onMouseEnter={openPopup}
			onMouseLeave={closePopup}
		>
			<div data-test-id="userLink" style={{ backgroundImage: `url(${AccountIcon})` }}>
				<p className={classes.clip}>{username}</p>
			</div>
		</section>
	);
};
export default UserLink;
