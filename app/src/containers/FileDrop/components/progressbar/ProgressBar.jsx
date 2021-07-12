import React            from "react";
import checkicon        from "../../../../assets/check.png";
import ButtonComponent from  "../../button/Button";
import                       "./ProgressBar.css";

export default function ProgressBar(props) {
  return (
    <>
      <div id="_progresscomplete" className="progress-bar">
        <h3 id="status">{props.status?"Uploading":"Complete"}</h3>
        <p id="loaded_n_total"> {!props.status ? '100%': 'NA'} - Files rebuild in 2.34 seconds</p>
        <div id="progressOptions" className="status-action-btns">
          <ButtonComponent imgsrc={checkicon} classname={"green-tick"} />
        </div>
        <progress
          className="progressbar"
          id="progressBar"
          value="100"
          max="100"
        ></progress>
      </div>
    </>
  );
}
