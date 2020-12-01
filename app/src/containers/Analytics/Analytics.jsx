import React, { useState, useContext, useEffect } from "react";
import { AnalysticsContext } from "../../context/analystics/analystics-context";

import classes from "./Analytics.module.scss";

import LineChart from "../../components/UI/Charts/LineChart/LineChart";
import PieChart from "../../components/UI/Charts/PieChart/PieChart";

import InfoBlock from "../../components/UI/InfoBlock/InfoBlock";
import Daterangepicker from "../../components/UI/Daterangepicker/Daterangepicker";

import dataChart from "../../data/charts/chart.json";

const Analytics = () => {
	const { startDate, endDate } = useContext(AnalysticsContext);

	const [data, setData] = useState(dataChart);

	const moment = endDate.diff(startDate, "hours");

	useEffect(() => {
		switch (moment) {
			case 1:
				setData(dataChart.slice(23, 25));
				break;
			case 12:
				setData(dataChart.slice(12, 25));
				break;
			case 24:
				setData(dataChart.slice(0, 25));
				break;
			default:
				setData(dataChart);
				break;
		}
	}, [moment]);

	return (
		<article className={classes.Analytics}>
			<div className={classes.top}>ICAP requests</div>
			<div className={classes.pickersWrap}>
				<div className={classes.pickersBlock}>
					<h3>Filter</h3>
					<Daterangepicker
						externalStyles={classes.pickers}
						// onChangeChartsData={changeChartData}
					/>
				</div>
			</div>
			<div className={classes.innerContent}>
				<h3>
					{moment > 24
						? `Transactions Since ${startDate.format(
								"DD/MM/YYYY hh:mm A"
						  )} Till ${endDate.format("DD/MM/YYYY hh:mm A")}`
						: `Transactions Over the Last ${moment} Hours`}
				</h3>
				<div className={classes.innerTop}>
					<div className={classes.infoBlocks}>
						<InfoBlock title={"Total files processed"} sum={"134,326"} />
						<InfoBlock title={"Total ICAP requests"} sum={"213,596"} />
						<InfoBlock title={"Max processed files/s"} sum={"75,491"} />
					</div>

					<div data-test-id="pieChart">
						<PieChart rawData={data} />
					</div>
				</div>
				<div data-test-id="lineChart" className={classes.lineChart}>
					<LineChart data={data} />
				</div>
			</div>
		</article>
	);
};

export default Analytics;
