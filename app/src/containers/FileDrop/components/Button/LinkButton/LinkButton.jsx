import React from "react";
import            "./LinkButton.css";

export default function LinkButton(props) {
  return (
    <>
      <button
        id={props.id}
        className=  {'root ' + props.classname}
        onClick={props.onClicked}
        style={{color: props.color}}
      >
        {props.imgsrc && <img src={props.imgsrc} alt="" />} 
        {props.loader && <div id="loader-protected" class="loader"></div>}{props.text}
      </button>
    </>
  );
}
