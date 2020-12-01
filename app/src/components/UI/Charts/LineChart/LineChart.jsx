import React from "react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	CartesianGrid,
	Legend,
	XAxis,
	YAxis,
} from "recharts";

import colours from "../../../../data/charts/colours.json";

const LineGraph = ({ data }) => {
	const dotStyle = { strokeWidth: 5.5, r: 5.5 };
	const lines = colours
		.map((entry) => {
			let entries = Object.keys(entry);
			if (entries.length > 0) {
				const series = entries[0];
				const name = series[0].toUpperCase() + series.slice(1).toLowerCase();
				const colour = entry[series];
				return (
					<Line
						key={series}
						dataKey={series}
						name={name}
						stroke={colour}
						fill={colour}
						strokeWidth={5}
						dot={dotStyle}
					/>
				);
			}
			return null;
		})
		.filter((s) => s);

	return (
		<ResponsiveContainer>
			<LineChart
				width={600}
				height={300}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
			>
				<CartesianGrid stroke="#ccc" vertical={false} />
				<XAxis
					dataKey="date"
					tick={{ transform: "translate(0, 10)", fontSize: "14px" }}
				/>
				<YAxis
					axisLine={false}
					type="number"
					//domain={["dataMin", 25000]}
					tickCount={6}
					tick={{ transform: "translate(-10, 0)", fontSize: "14px" }}
					tickLine={false}
				/>
				<Legend iconSize={34} wrapperStyle={{ bottom: 0 }} />
				{lines}
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LineGraph;
