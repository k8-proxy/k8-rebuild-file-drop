import React            from "react";
import ButtonComponent  from "../button/Button";
import unprocessImg     from '../../../assets/word-icon.png'
import RebuildTable     from "./RebuildTable";
import                       "../Filedrop.css";


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
                <RebuildTable rebuildFiles={props.rebuildFiles}/>
                </ul>
                <div className="unprocessedFiles">
                    <h3>Unprocessed Files</h3>
                    <h4><img src={unprocessImg} className="unprocessedImg" alt="" /> <span>Samlefile.docx</span></h4>
                </div>
              </div>
            </div>
            <div className="two-btn lastbtns">
              <ButtonComponent text={"Try Another file"} />
              <ButtonComponent
                text={"Download All Clean Files"}
                classname={"green"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
