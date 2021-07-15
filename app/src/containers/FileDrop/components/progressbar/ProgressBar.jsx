import React            from "react";
import checkicon        from "../../../../assets/check.png";
import ButtonComponent  from "../Button/Button/Button";
import LineProgress     from "./LineProgress";
import                       "./ProgressBar.css";

export default function ProgressBar(props) {


  const getTime=()=>{
    var duration = ( new Date().getTime() - props.rebuildStartTime ) / 1000;
    return " File rebuilt in " + parseFloat(duration).toFixed(2) + " seconds";
  }
  return (
    <>
      <div id="_progresscomplete" className="progress-bar">
        <h3 id="status">{props.status?"Uploading":"Complete"}</h3>
        <p id="loaded_n_total"> {!props.status ? '100% - ' + getTime() : props.value + '%'}</p>
        <div id="progressOptions" className="status-action-btns">
          {!props.status && <ButtonComponent imgsrc={checkicon} classname={"green-tick"} loader = {false}/>}
        </div>
          <LineProgress value={props.value}/>
      </div>
    </>
  );
}
