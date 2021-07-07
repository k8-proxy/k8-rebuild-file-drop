import React        from "react";
import FileDropzone from "./FileDropZone";
import ViewResult    from "./ViewResult";

export default function DragDrop(props) {
  return (
    <>
      <div className="right-ban">
        <div className="file-upload">
          <div id="fancy-contact-form">
            <form
              id="upload_form"
              className="dropzone"
              enctype="multipart/form-data"
              method="post"
            >
              <FileDropzone setAnalysisResult = {props.setAnalysisResult}/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
