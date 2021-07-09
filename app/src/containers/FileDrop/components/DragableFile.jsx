import React, { useState, useEffect } from "react";
import pdficon                        from "../../../assets/pdf-icon.png";
import xlxsicon     from "../../../assets/excel-icon.png";
import wordicon     from "../../../assets/word-icon.png";
import ppticon      from "../../../assets/ppt-icon.png";
import samplezip    from "../../../assets/zip.png";
import samplefolder from "../../../assets/folder.png";
import SampleFile   from "./SampleFile";
import                   "../Filedrop.css";


export default function DragableFile() {

  const triggerFileInput=(event) =>{
    document.getElementById('file-1').click();
    event.stopPropagation();
    console.log("event:" + event)
  }

  return (
    <>
      <div className="white-inner">
        <p>
          Drag a sample file into the box, or{" "}
          <button id="tryyourown" onClick={triggerFileInput} >try your own</button>
        </p>
        <ul>
          <SampleFile
            link={"images/PDF_Demo_File.pdf"}
            text={"sample.pdf"}
            imgsrc={pdficon}
          />
          <SampleFile
            link={"images/Word_Demo_File.docx"}
            text={"sample.docx"}
            imgsrc={wordicon}
          />
          <SampleFile
            link={"images/PowerPoint_Demo_File.ppt"}
            text={"sample.pptx"}
            imgsrc={ppticon}
          />
          <SampleFile
            link={"images/Excel_Demo_File.xls"}
            text={"sample.xlsx"}
            imgsrc={xlxsicon}
          />
          <SampleFile
            link={"images/Excel_Demo_File.xls"}
            text={"sample.zip"}
            imgsrc={samplezip}
          />
          <SampleFile
            link={"images/Excel_Demo_File.xls"}
            text={"sample folder"}
            imgsrc={samplefolder}
          />
        </ul>
      </div>
    </>
  );
}
