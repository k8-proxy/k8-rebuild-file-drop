import React from "react";
import { CSSTransition } from "react-transition-group";
import Pdf from "react-to-pdf";

import classes from "./RenderResults.module.scss";

import RenderAnalysis from "./RenderAnalysis/RenderAnalysis";
import SectionTitle from "../SectionTitle/SectionTitle";
import DownloadAnalysisReport from "./DownloadAnalysisReport/DownloadAnalysisReport";
import FileAttributes from "./FileAttributes/FileAttributes";
import ButtonsContainer from "../ButtonsContainer/ButtonsContainer";
import Button from "../UI/Button/Button";

const ref = React.createRef();

function RenderResults({
	file,
	analysisReport,
	analysisReportString,
	validation,
	isShowResult,
}) {
	if (validation) {
		return (
			<div className="validationErrors">
				<p>{validation}</p>
			</div>
		);
	}

	if (file && analysisReport) {
		const sanitisations = analysisReport.getElementsByTagName(
			"gw:SanitisationItem"
		);
		const remediations = analysisReport.getElementsByTagName("gw:RemedyItem");
		const issues = analysisReport.getElementsByTagName("gw:IssueItem");
		const [
			{ value: fileType } = { value: "unknown" },
		] = analysisReport.getElementsByTagName("gw:FileType");
		const { name: fileName } = file;
		const hasIssues = !!issues.length;

		var getAnalysisReport = () => {
			const binaryData = [];
			binaryData.push(analysisReportString);
			let url = window.URL.createObjectURL(
				new Blob(binaryData, { type: "text/xml" })
			);
			let a = document.createElement("a");
			a.href = url;
			a.download = file.name + ".xml";
			a.click();
		};

		if (
			!isShowResult &&
			(sanitisations.length || remediations.length || hasIssues)
		) {
			return (
				<>
					<div data-test-id="divFileDropResults" className={classes.RenderResults} >
						<SectionTitle externalStyles={classes.headline}>
							Analysis Report
						</SectionTitle>

						<div className={classes.container}>
							<ButtonsContainer externalStyles={classes.buttons}>
								<Pdf targetRef={ref} filename={(file.name + "-analysis-report.pdf")}>
									{({ toPdf }) => <Button
										testId="buttonFileDropDownloadPdf"
										onButtonClick={() => toPdf()}
										externalStyles={classes.button}
									>
										PDF
									</Button>}
								</Pdf>
								<Button
									testId="buttonFileDropDownloadXml"
									onButtonClick={() => getAnalysisReport()}
									externalStyles={classes.button}
								>
									XML
							</Button>
							</ButtonsContainer>
							<div ref={ref}>
							<FileAttributes file={file} fileType={fileType} />
							<RenderAnalysis
								remediations={remediations}
								sanitisations={sanitisations}
								issues={issues}
							/>
							</div>
						</div>
					</div>
				</>
			);
		}

		return (
			<CSSTransition
				in={isShowResult}
				timeout={300}
				classNames={{
					enterActive: classes.fadeEnterActive,
					exitActive: classes.fadeExitActive,
				}}
				mountOnEnter
				unmountOnExit
			>
				<div className={[classes.RenderResults, classes.result].join(" ")}>
					<SectionTitle>File is clean!</SectionTitle>
					<DownloadAnalysisReport
						report={analysisReportString}
						filename={fileName}
					/>
					<FileAttributes file={file} fileType={fileType} />
				</div>
			</CSSTransition>
		);
	}
	return null;
}

export default RenderResults;
