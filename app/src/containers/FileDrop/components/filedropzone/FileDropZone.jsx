import React, { useState, useEffect, useRef, useContext } from "react";
import { trackPromise }             from "react-promise-tracker";
import { useToasts }                from "react-toast-notifications";
import { usePromiseTracker }        from "react-promise-tracker";


import { engineApi, ResponseError } from "../../../../api";
import messages                     from "../../../../data/fileDrop/messages.json";
import DragableFile                 from '../Dragablefile/DragableFile';
import ProgressBar                  from '../Progressbar/ProgressBar';
import                                   './FileDropZone.css';
const XMLParser = require("react-xml-parser");


const TOTAL_FILE_LIMIT_MB = 50;

export default function FileDropzone(props) {
 
  const { promiseInProgress } = usePromiseTracker({ delay: 100 });
  const { addToast } = useToasts();
  const [status, setStatus] = useState(false);
  const [sampleFilePath, setSampleFilePath] = useState(null);
  const dropRef = useRef();

 
  useEffect(() => { 
    let div = dropRef.current
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
    div.addEventListener('change', uploadHandler)
    
  }, []) 


  useEffect(()=>{
      if(!sampleFilePath) return;
      var url  = window.location.href + sampleFilePath;
      fetch(url)
      .then( res => res.blob() )
      .then( blob => {
      var file = new File([blob],  url.split('/').pop())
      props.dropAnotherFile();
      analyseFile(file)
      });
  },[sampleFilePath])

  const getFileSizeInMB = (file) => {
    const size_of_file = file.size / 1000000;
    return size_of_file;
  };

  const analyseFile = (accepted) => {
    trackPromise(
      engineApi
        .analyseFile(accepted,(event) => {
          var percentage = Math.round(
            (100 * event.loaded) / event.total
          );
          props.setProgressInfo(percentage);
        })
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
    console.log("uploadHandler")
    event.preventDefault();
    event.stopPropagation()
    const fileList = event.target.files;
    for (const file of fileList) {
      // if (getFileSizeInMB(file) > FILE_LIMIT_MB) {
      // }
      console.log("uploadHandler:" + file.name)
      props.dropAnotherFile();
      analyseFile(file);
    }
    event.target.value = "";
  };

  const handleDrop = (event) => {
    console.log("dropHandler")
    event.preventDefault()
    event.stopPropagation()
    if (
      event.dataTransfer &&
      event.dataTransfer.types[0] == "Files" &&
      event.dataTransfer.types.length == 1
    ) {
      var file = event.dataTransfer.files[0]; //_("file-1").files[0];

      //Files smaller than 6MB - Normal
      if (getFileSizeInMB(file) > TOTAL_FILE_LIMIT_MB) {
        return;
      }
      props.dropAnotherFile();
      analyseFile(file);
      event.dataTransfer.value = "";
    } 
  };

  const handleDrag = (e) => {e.preventDefault()
    e.stopPropagation()}
  const handleDragIn = (e) => {e.preventDefault()
    e.stopPropagation()}
  const handleDragOut = (e) => {e.preventDefault()
    e.stopPropagation()}


  const sampleFileHandler =(link)=>{
    setSampleFilePath(link);
  }
  return (
    <>
      <div id="dropzone-file" ref={dropRef}>
        <div id="_dragsection" className="dz-default dz-message">
          <div className="img-pnl"></div>
          <div className="file-text">
            Drop a file here, or <span>browse</span>
          </div>
          <div className="file-text2">
            Supports: popular file types, up to 15MB
            <br></br>
            Maximum of 50 files or 5 folders
          </div>
        </div>
        <input
          type="file"
          name="file-1"
          id="file-1"
          className="inputfile inputfile-1"
          onChange={uploadHandler}
        />
        <label id="inputFileLabel" for="file-1"></label>
      </div>
      {(promiseInProgress || props.results.length > 0) && (
        <ProgressBar
          rebuildStartTime={props.rebuildStartTime}
          status={promiseInProgress}
          value={props.progressInfo}
        />
      )}
      <DragableFile setSampleFile={sampleFileHandler} />
    </>
  );
}