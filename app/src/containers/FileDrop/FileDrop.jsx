import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { trackPromise } from "react-promise-tracker";

import { validFileType } from "../../actions";
import { engineApi, ResponseError } from "../../api";
import { FileDropContext } from "../../context/fileDrop/fileDrop-context";

import classes from "./FileDrop.module.scss";

import supporting from "../../data/fileDrop/supportedFileTypes.json";
import messages from "../../data/fileDrop/messages.json";

import refreshIcon from "../../assets/svg/file-drop/refresh-button.svg";

import StyledDropzone from "../../components/UI/StyledDropzone/StyledDropzone";
import Button from "../../components/UI/Button/Button";
import RenderResults from "../../components/Results/RenderResults";
import IconButton from "../../components/UI/IconButton/IconButton";

const FileDrop = () => {
	const { addToast } = useToasts();
	const {
		file,
		analysisReport,
		analysisReportString,
		validation,
		fileProcessed,
		loading,
		setResultFromServer,
		resetState,
	} = useContext(FileDropContext);
	const [showResult, setShowResult] = useState(false);

	const accept = [];
	// const vendors = [];
	const fileTypes = [];
	const extByTypes = {};

	supporting.browser.forEach((vendor, vIndex) => {
		const vendorName = Object.keys(vendor)[0];
		const vendorTypes = vendor[vendorName];
		// vendors.push(vendorName);
		fileTypes[vIndex] = [];

		vendorTypes.forEach((type, tIndex) => {
			const typeName = Object.keys(type)[0];
			const extensions = type[typeName];
			fileTypes[vIndex].push(typeName);
			extByTypes[vendorName + "-" + typeName] = extensions;

			extensions.forEach((extension, eIndex) => {
				accept.push(extension);
			});
		});
	});

	const handleDrop = ([accepted = {}], [rejected = {}]) => {
		if (rejected && rejected.errors) {
			const [{ code, message } = { code: "unknown-error" }] = rejected.errors;
			let messageText = messages[code];

			if (!messageText) {
				console.warn("Missed message for code ", code);
				messageText = message || code;
			}
			addToast(messageText, {
				appearance: "warning",
				autoDismiss: true,
			});
			return;
		}

		// const { name, type } = accepted;
		// console.warn(` ----------- Start of processing ${ name } [${ type }]  ${new Date().toISOString()} -------------`);
		// console.dir(accepted);

		trackPromise(
			validFileType(accepted)
				.then((result) => {
					// console.warn(` ----------- File Type is checked at ${new Date().toISOString()} -------------`);
					if (!result) {
						const messageText = messages["file-invalid-type"];
						addToast(messageText, {
							appearance: "warning",
							autoDismiss: true,
						});
						return;
					}
					return engineApi.analyseFile(accepted);
				})
				.then((result) => {
					// console.warn(` ----------- File Analysis is done ${new Date().toISOString()} -------------`);
					const XMLParser = require("react-xml-parser");
					const xml = new XMLParser().parseFromString(result);

					setResultFromServer({
						analysisReport: xml,
						analysisReportString: result,
						file: accepted,
						fileProcessed: true,
					});
				})
				.catch((error) => {
					// console.warn(` ----------- Caught of File Drop ${new Date().toISOString()} -------------`);
					if (error instanceof ResponseError) {
						const {
							response: { type, status },
						} = error;
						let appearance = messages.toasterAppearance[status],
							message = messages.httpCodes[status];
						if (type) {
							if (!appearance) {
								appearance = messages.toasterAppearance[type];
							}
							if (!message) {
								message = messages.httpCodes[type];
							}
						}
						if (!appearance) {
							appearance = "error";
						}
						if (!message) {
							message = error.message;
						}
						addToast(message, {
							appearance,
							autoDismiss: true,
						});
					} else {
						addToast(error.message, {
							appearance: "error",
							autoDismiss: true,
						});
					}
				})
				.finally(() => {
					//setResultFromServer({ loading: false });
				})
		);
	};

	const dropAnotherFile = () => {
		resetState();
		setShowResult(false);
	};

	return (
		<section className={classes.FileDrop}>
			<div className={classes.dropzoneWrap}>
				{!fileProcessed ? (
					<section
						style={{
							display: "flex",
							background: "white",
							margin: 0,
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						<StyledDropzone
							//externalStyles={classes.dropzone}
							onDrop={handleDrop}
							accept={accept}
							loading={loading}
						>
							<div className={classes.message}>
								Drop a file here to have it processed by Glasswall CDR
							</div>
							<div className={[classes.message, classes.reject].join(" ")}>
								Please use a supported file type
							</div>
							<div className={[classes.image, classes.imageDrop].join(" ")} />
							<Button testId="buttonFileDropSelectFile" externalStyles={classes.button}>SELECT A FILE</Button>
						</StyledDropzone>
						<div className={classes.infoBlock}>
							<p>
								Once the file has been uploaded, it is passed through the
								Analysis API of the Glasswall SDK. The applied content
								management policy has all content flags set to 'Sanitise'.
							</p>
						</div>
					</section>
				) : (
						<>
							<div className={[classes.dropzone, classes.processed].join(" ")}>
								<div className={classes.results}>
									<IconButton
										externalStyles={classes.buttonRefresh}
										onClick={dropAnotherFile}
									>
										<img src={refreshIcon} alt="drop refresh icon" />
									</IconButton>
									<div
										className={[classes.message, classes.messageProcessed].join(
											" "
										)}
									>
										Your file has been processed
								</div>
									<div
										className={[classes.image, classes.imageProcessed].join(
											" "
										)}
									/>
									<Button
										testId="buttonFileDropViewResult"
										onButtonClick={() => setShowResult(true)}
										externalStyles={classes.button}
									>
										VIEW RESULT
								</Button>
								</div>
							</div>
							<RenderResults
								file={file}
								analysisReport={analysisReport}
								analysisReportString={analysisReportString}
								validation={validation}
								onAnotherFile={dropAnotherFile}
								isShowResult={showResult}
							/>
						</>
					)}
			</div>
		</section>
	);
};

export default FileDrop;
