import React, {useContext}        from "react";
import pdficon      from "../../../../assets/pdf-icon.png";
import xlxsicon     from "../../../../assets/excel-icon.png";
import wordicon     from "../../../../assets/word-icon.png";
import ppticon      from "../../../../assets/ppt-icon.png";
import samplezip    from "../../../../assets/zip.png";
import samplefolder from "../../../../assets/folder.png";
import Samplefiles  from "../../../../data/fileDrop/samplefiles.json";
import SampleFile   from "./SampleFile";
import                   "./DragableFile.css";

import { FileDropContext }    from "../../../../context/fileDrop/fileDrop-context";
import { isPropertySignature } from "typescript";

export default function DragableFile(props) {

  const {
	  setLocalFilePath,
    filePath
	} = useContext(FileDropContext);

  const triggerFileInput=(event) =>{
    document.getElementById('file-1').click();
    event.stopPropagation();
  }

  const fileIcon =(type)=>{
    switch(type){
      case "pdficon": return pdficon;
      case "xlxsicon": return xlxsicon;
      case "wordicon": return wordicon;
      case "ppticon": return ppticon;
      case "samplefolder": return samplefolder;
      case "samplezip": return samplezip;

    }
  }
  const setSampleFile =(link) =>{
    props.setSampleFile(link)
    
  }

  return (
    <>
      <div className="white-inner">
        <p>
          Drag a sample file into the box, or{" "}
          <button id="tryyourown" onClick={triggerFileInput} >try your own</button>
        </p>
        <ul>
        {Samplefiles.files.map((file, index)=>{
          return  <SampleFile
                  index={index}
                  setSampleFile ={setSampleFile}
                  link={file.path}
                  text={file.name}
                  imgsrc={fileIcon(file.icon)}
                />
        })}
        </ul>
    </div>
    </>
  );
}
