import React, { useState, useEffect }    from "react";
import { trackPromise }       from "react-promise-tracker";
import { useToasts }          from "react-toast-notifications";
import { usePromiseTracker }  from "react-promise-tracker";

// import { validFileType } from "../../actions";
import { engineApi, ResponseError } from "../../../api";
import supporting                   from "../../../data/fileDrop/supportedFileTypes.json";
import messages                     from "../../../data/fileDrop/messages.json";
import DragableFile                 from "./DragableFile";
import ProgressBar                  from "./ProgressBar";


const XMLParser = require("react-xml-parser");

const TOTAL_FILE_LIMIT_MB = 50;

export default function FileDropzone(props) {
  const { promiseInProgress } = usePromiseTracker({ delay: 100 });
  const { addToast } = useToasts();
  const [status, setStatus] = useState(false);

  useEffect(() => { setStatus(false)}, []) 

  const getFileSizeInMB = (file) => {
    const size_of_file = file.size / 1000000;
    return size_of_file;
  };

  const analyseFile = (accepted) => {
    trackPromise(
      engineApi
        .analyseFile(accepted)
        .then((result) => {
          const xml = new XMLParser().parseFromString(result);
          setStatus(true);
          props.setAnalysisResult({
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

  const uploadHandler = (event) => {
    event.preventDefault();
    const fileList = event.target.files;
    for (const file of fileList) {
      // if (getFileSizeInMB(file) > FILE_LIMIT_MB) {
      // }
      analyseFile(file);
    }
  };


  return (
    <>
      <div id="dropzone-file">
        <div id="_dragsection" className="dz-default dz-message">
          <div className="img-pnl"></div>
          <div className="file-text">
            Drop a file here, or <span>browse</span>
          </div>
          <div className="file-text2">
            Supports: popular file types, up to 6MB
            <br></br>
            Maximum of 50
          </div>
        </div>
        <input
          type="file"
          name="file-1"
          id="file-1"
          className="inputfile inputfile-1"
          onChange={uploadHandler}
          multiple
        />
        <label id="inputFileLabel" for="file-1"></label>
      </div>
      {(promiseInProgress || props.results.length > 0) && <ProgressBar status={promiseInProgress} />}
      <DragableFile />
    </>
  );
}
