import React from "react";

import classes from "./DownloadAnalysisReport.module.scss";

import Button from "../../UI/Button/Button";

class DownloadAnalysisReport extends React.Component {
	getAnalysisReport = () => {
		const binaryData = [];
		binaryData.push(this.props.report);
		let url = window.URL.createObjectURL(
			new Blob(binaryData, { type: "text/xml" })
		);
		let a = document.createElement("a");
		a.href = url;
		a.download = this.props.filename + ".xml";
		a.click();
	};

	render() {
		return (
			<Button
				externalStyles={classes.button}
				onButtonClick={this.getAnalysisReport}
			>
				Download Analysis Report
			</Button>
		);
	}
}

export default DownloadAnalysisReport;
