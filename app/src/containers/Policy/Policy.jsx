import React, { useState, useContext } from "react";

import { PolicyContext } from "../../context/policy/policy-context";

import classes from "./Policy.module.scss";

import prevPolicy from "../../data/prevPolicy.json";
import currentPolicyIcon from "../../assets/svg/policy/current-policy-icon.svg";
import previousPolicyIcon from "../../assets/svg/policy/previous-policy-icon.svg";

import Current from "./Current/Current";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";

const Policy = () => {
	const {
		id,
		email,
		policyFlags,
		timestamp,
		isPolicyChanged,
		changeToggle,
		cancelChanges,
		saveChanges,
	} = useContext(PolicyContext);

	const policy = prevPolicy.find(
		(it) => it.id === "prev-Adam2-20092020165445"
	);

	const [currentPolicy, setCurrentPolicy] = useState(true);
	const [selectedTab, setSelectedTab] = useState("Current");

	const tabs = [
		{ testId: "buttonPolicyCurrentTab", name: "Current", icon: currentPolicyIcon },
		{ testId: "buttonPolicyHistoryTab", name: "History", icon: previousPolicyIcon },
	];

	return (
		<article className={classes.Policy}>
			<TabNav
				tabs={tabs}
				isSelectedTab={selectedTab}
				onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
			>
				<Tab isSelected={selectedTab === "Current"}>
					<Current
						isPolicyChanged={isPolicyChanged}
						email={email}
						timestamp={timestamp}
						id={id}
						policy={policy}
						currentPolicy={currentPolicy}
						policyFlags={currentPolicy ? policyFlags : policy.policyFlagList}
						changeToggle={changeToggle}
						cancelChanges={cancelChanges}
						saveChanges={saveChanges}
					/>
				</Tab>
				<Tab isSelected={selectedTab === "History"}>
					<History
						setPrevPolicy={() => setCurrentPolicy(false)}
						isCurrent={currentPolicy}
					/>
				</Tab>
			</TabNav>
		</article>
	);
};

export default Policy;
