import axios from "axios";

import ResponseError from './ResponseError';

const analysisSuffix = '/api/analyse/base64';
const rebuildSuffix = '/api/Rebuild/base64';
const versionSuffix = '/api/detail/version';

const analyseFile = (file, uploadProgress) => {
    return readFileBase64Async(file).then(base64 => {
        const raw = JSON.stringify({ "Base64": base64 });
        const url = process.env.REACT_APP_ANALYSE_API_ENDPOINT + analysisSuffix;
        return callFileAnalysis(url, raw, uploadProgress);
    });
}

const protectFile = (file) => {
    return readFileBase64Async(file).then(base64 => {
        const raw = JSON.stringify({ "Base64": base64 });
        const url = process.env.REACT_APP_REBUILD_API_ENDPOINT + rebuildSuffix;
        return callFileProtect(url, raw);
    });
}

const readFileBase64Async = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.replace(/^data:.+;base64,/, '');
            resolve(base64);
        };
    });
}

const callFileAnalysis = (url, raw, callback) => {
    console.log("callFileAnalysis" + callback)
    const promise = new Promise((resolve, reject) => {
        resolve(axios({
            url: url,
            headers: {
                "x-api-key": process.env.REACT_APP_ANALYSE_API_KEY,
                "Content-Type": "application/json",
            },
            data: raw,
            method: 'post',
            onUploadProgress: callback
          })
        .then((response) => {
            if ( response.status === 200 ) {
                return response.data;
            } else {
                throw harvestErrorMessage(response);
            }
        }));
    });

    return promise;
}


const callFileProtect = (url, data) => {
    const promise = new Promise((resolve, reject) => {
        resolve(fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "x-api-key": process.env.REACT_APP_REBUILD_API_KEY,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if ( response.ok ) {
                return response.text().then(function (text) {
                    const chars = atob(text);

                    const byteNumbers = new Array(chars.length);
                    for ( let i = 0; i < chars.length; i++ ) {
                        byteNumbers[i] = chars.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);

                    return new Blob([ byteArray ])
                })
            } else {
                throw harvestErrorMessage(response);
            }
        }));
    });

    return promise;
}

const callSDKVersions=async ()=>{
    const url = process.env.REACT_APP_REBUILD_API_ENDPOINT + versionSuffix;
        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
}

function harvestErrorMessage(response) {
    return new ResponseError(`Unexpected API call failure`, response);
}


export const engineApi = {
    analyseFile,
    protectFile,
    callSDKVersions
};
