import React, { useMemo } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { useDropzone } from "react-dropzone";

import classes from "./StyledDropzone.module.scss";

import LoadingIndicator from "../Spinner/LoadingIndicator";

/*
import mimeTypes from '../../data/mimeTypes.json';
import supporting from '../../data/supportedFileTypes.json';

const acceptableExtensions = {};

supporting.browser.forEach((vendor, vIndex) => {
    const vendorName = Object.keys(vendor)[0];
    const vendorTypes = vendor[vendorName];

    vendorTypes.forEach((type, tIndex) => {
        const typeName = Object.keys(type)[0]
        const extensions = type[typeName];

        extensions.forEach((extension, eIndex) => {
            acceptableExtensions[extension] = mimeTypes[extension]
        })
    })
});

const uniqueMimeTypes = {};

Object.values(acceptableExtensions).forEach((mimeTypesByExt) => {
    mimeTypesByExt && mimeTypesByExt.forEach((mimeType) => {
        uniqueMimeTypes[mimeType] = true;
    })
})
const accept = Object.keys(uniqueMimeTypes).join(',');
*/

export default function StyledDropzone({
	onDrop,
	children,
	loading,
	externalStyles,
}) {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		// accept,
		onDrop,
		noClick: loading,
		noDrag: loading,
		maxSize: 3.5e6,
	});

	const { promiseInProgress } = usePromiseTracker();

	let cls = useMemo(
		() => [
			classes.border,
			classes.native,
			isDragActive ? classes.active : "",
			isDragAccept ? classes.accept : "",
			isDragReject ? classes.reject : "",
			promiseInProgress ? classes.progress : "",
			loading ? classes.loading : "",
		],
		[isDragActive, isDragReject, isDragAccept, promiseInProgress, loading]
	);
	cls = cls.filter((item) => item);
	const className = cls.join(" ");

	return (
		<div className={[classes.container, externalStyles].join(" ")}>
			<div className={className} {...getRootProps()}>
				<input {...getInputProps()} />
				<LoadingIndicator key={6} />
				{children}
			</div>
		</div>
	);
}
