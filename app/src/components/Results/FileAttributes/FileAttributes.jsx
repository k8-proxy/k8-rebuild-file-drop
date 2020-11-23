import React from "react";

import classes from "./FileAttributes.module.scss";

function FileAttributes({ file, fileType } = {}) {
	const { name, size } = file;
	return (
		<div className={classes.FileAttributes}>
			<div className={classes.header}>File Attributes</div>
			<table className={classes.table}>
				<tbody>
					<tr>
						<td>File Name: </td>
						<td>{name}</td>
					</tr>
					<tr>
						<td>File Size: </td>
						<td>{size}</td>
					</tr>
					<tr>
						<td>Type: </td>
						<td>{fileType}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default FileAttributes;
