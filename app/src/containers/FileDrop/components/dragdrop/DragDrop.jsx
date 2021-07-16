import React        from "react";
import FileDropzone from "../Filedropzone/FileDropZone";
import              './DragDrop.css'; 

export default function DragDrop(props) {
  return (
    <>
      <div className="right-ban">
        <div className="file-upload">
          <div id="fancy-contact-form" className="dropzone">
            <FileDropzone
              setAnalysisResult={props.setAnalysisResult}
              results={props.results}
              dropAnotherFile={props.dropAnotherFile}
              progressInfo={props.progressInfo}
              setProgressInfo = {props.setProgressInfo}
              rebuildStartTime = {props.rebuildStartTime}
            />
          </div>
        </div>
      </div>
    </>
  );
}
