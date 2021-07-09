import React        from "react";
import FileDropzone from "./FileDropZone";
import ViewResult    from "./ViewResult";

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
