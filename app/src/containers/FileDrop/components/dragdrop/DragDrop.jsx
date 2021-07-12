import React        from "react";
import FileDropzone from "../filedropzone/FileDropZone";
// import ViewResult    from "../ViewResult";
import              './DragDrop.css'; 

export default function DragDrop(props) {
  return (
    <>
      <div className="right-ban">
        <div className="file-upload">
          <div id="fancy-contact-form"   className="dropzone">
              <FileDropzone setAnalysisResult = {props.setAnalysisResult} results = {props.results}/>
          </div>
        </div>
      </div>
    </>
  );
}
