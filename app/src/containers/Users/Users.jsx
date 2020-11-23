import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./Users.module.scss";

//import UsersIcon from "../../assets/users-icon.svg";
import UsersIconSelected from "../../assets/users-icon-selected.svg";

// import RolesIcon from "../../assets/roles-icon.svg";
// import RolesIconSelected from "../../assets/roles-icon-selected.svg";

import User from "./User/User";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";

const users = [
	{
		name: "Adam2",
		id: "Adam2",
		email: "ahewitt@glasswallsolutions.com",
		typeGroup: "Administrator",
	},
];

//const userTypes = ["Administrator", "User"];

const tabs = [
	{ name: "Users", icon: UsersIconSelected, iconSelected: UsersIconSelected },
];

const Users = () => {
	const [selectedTab, setSelectedTab] = useState("Users");

	const userFields = users.map((u) => {
		return (
			<User key={u.id} name={u.name} email={u.email} group={u.typeGroup} />
		);
	});
	return (
		<section className={classes.Users}>
			<TabNav
				tabs={tabs}
				isSelectedTab={selectedTab}
				onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
			>
				<Tab isSelected={selectedTab === "Users"}>
					<div className={classes.wrap}>
						<h2 className={classes.head}>Users</h2>
						<div className={classes.block}>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>User Group</TableCell>
										<TableCell>Confirmed</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>{userFields}</TableBody>
							</Table>
						</div>
					</div>
				</Tab>
			</TabNav>
		</section>
	);
};

export default Users;
