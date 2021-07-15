import React            from "react";
import ButtonComponent  from "../../button/Button";
import unprocessImg     from '../../../../assets/word-icon.png'
import RebuildTable     from "../rebuildtable/RebuildTable";
import                       "./ProcessingResult.css";


export default function RebuildFilesReady(props) {
  return (
    <>
      <div id="cleanRebuildFiles" className="cleansection">
        <div className="container">
          <div className="clean-section">
            <h3>Your clean, rebuild files are ready</h3>
            <div className="cleanRebuilddiv">
              <div className="mp-padding">
                <ul>
                <RebuildTable rebuildFiles={props.rebuildFiles} viewResult = {props.viewResult} downloadClean = {props.downloadClean}/>
                {
                props.unprocessed.length > 0 && 
                <div className="unprocessedFiles" >
                    <h3>Unprocessed Files</h3>
                    <h4><img src={unprocessImg} className="unprocessedImg" alt="" /> <span>Samlefile.docx</span></h4>
                </div>
                }
                </ul>
              </div>
            </div>
            <div className="two-btn lastbtns">
              <ButtonComponent 
              text={"Try Another file"} 
              loader = {false}
              onClicked ={()=>{props.dropAnotherFile()}}
              />
              <ButtonComponent
                text={"Download All Clean Files"}
                loader = {false}
                classname={"green"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
