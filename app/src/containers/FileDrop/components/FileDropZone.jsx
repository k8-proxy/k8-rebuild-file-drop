import React                        from "react";
import { trackPromise }             from "react-promise-tracker";
import { useToasts }                from "react-toast-notifications";

// import { validFileType } from "../../actions";
import { engineApi, ResponseError } from "../../../api";
import supporting                   from "../../../data/fileDrop/supportedFileTypes.json";
import messages                     from "../../../data/fileDrop/messages.json";
const XMLParser = require("react-xml-parser");

const TOTAL_FILE_LIMIT_MB = 50;

export default function FileDropzone(props) {
	const { addToast } = useToasts();
  const [resultFromServer, setResultFromServer] = React.useState(null);

  const getFileSizeInMB=(file) =>{
    const size_of_file = file.size / 1000000;
    return size_of_file
}

const analyseFile=(accepted) =>{
  trackPromise(
    engineApi.analyseFile(accepted)
      .then((result) => {
        const xml = new XMLParser().parseFromString(result);

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
}

const uploadHandler=(event)=>{
  event.preventDefault();
  console.log("uploadHandler:" + event)
    const fileList = event.target.files;;
    // if (getFileSizeInMB(file) > FILE_LIMIT_MB) {
    //     // resetRebuild(true);
    //     // displayError("File too big. File upto 15 MB is supported");
    //     return
    // }
    // displayRebuildUI();
    console.log(typeof fileList);
    
    for (const file of fileList) {
      // Not supported in Safari for iOS.
      const name = file.name ? file.name : 'NOT SUPPORTED';
      // Not supported in Firefox for Android or Opera for Android.
      const type = file.type ? file.type : 'NOT SUPPORTED';
      // Unknown cross-browser support.
      const size = file.size ? file.size : 'NOT SUPPORTED';
      console.log({file, name, type, size});
      analyseFile(file);
    }
    
   
}

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
          onChange ={uploadHandler}
          multiple
        />
        <label id="inputFileLabel" for="file-1"></label>
      </div>
    </>
  );
}
