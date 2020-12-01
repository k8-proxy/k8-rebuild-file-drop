const fileTypeDetectionSuffix = '/api/FileTypeDetection/base64';

const getFileType = (file) => {
  return readFileBase64Async(file).then(base64 => {
    const raw = JSON.stringify({ "Base64": base64 });
    const url = process.env.REACT_APP_FILETYPEDETECTION_API_ENDPOINT + fileTypeDetectionSuffix;
    return callFileTypeDetection(url, raw);
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

const callFileTypeDetection = (url, raw) => {
  const promise = new Promise((resolve, reject) => {
      resolve(fetch(url, {
        method: 'POST',
        body: raw,
        headers: {
          "x-api-key" : process.env.REACT_APP_FILETYPEDETECTION_API_KEY,
          "Content-Type": "application/json"
      }})
      .then ((response) => {
        if (response.ok) {
          return response.json()
        }
        else{
          throw new Error('Something went wrong');
        }
      })
      .catch (error => {
        console.log("Error occured: " + error)
      }))
    });

  return promise;
}

export const fileTypeDetectionApi = {
  getFileType
};
