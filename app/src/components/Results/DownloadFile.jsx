import React from "react";
import { trackPromise } from "react-promise-tracker";
import { engineApi } from "../../api";
import Button from "../UI/Button/Button";

const clsButton = {
	fontSize: `1rem`,
	fontWeight: `800`,
	background: ` #1a919a`,
	padding: `1.25rem 2.75rem`,
	color: `white`,
	border: ` none`,
};

class DownloadFile extends React.Component {
	getProtectedFile = () => {
		trackPromise(
			engineApi
				.protectFile(this.props.file)
				.then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = this.props.file.name;
					a.click();
				})
				.catch((error) => {
					console.log(error.message);
				})
		);
	};

	render() {
		if (!this.props.hasIssues) {
			return (
				<Button buttonStyle={clsButton} onClick={this.getProtectedFile}>
					Download Protected File
				</Button>
			);
		}
		return null;
	}
}

export default DownloadFile;
