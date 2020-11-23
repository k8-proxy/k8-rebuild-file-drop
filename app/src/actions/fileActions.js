import { fileTypeDetectionApi } from "../api";

const unsupportedTypes = [
    "Unknown",
    "FileIssues",
    "BufferIssues",
    "InternalIssues",
    "LicenseExpired",
    "PasswordProtectedOpcFile",
];

async function validFileType(file) {
    let result = await fileTypeDetectionApi.getFileType(file) || {};
    return !unsupportedTypes.includes(result.FileTypeName);

}

export {
    validFileType,
};
