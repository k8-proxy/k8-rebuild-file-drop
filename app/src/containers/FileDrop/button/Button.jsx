import React from "react";
import            "../Filedrop.css";

export default function ButtonComponent(props) {
  return (
    <>
      <button
        id={props.id}
        className={props.classname}
        onClick={props.onClicked}
      >
        {props.imgsrc && <img src={props.imgsrc} alt="" />} 
        {props.loader && <div id="loader-protected" class="loader"></div>}{props.text}
      </button>
    </>
  );
}
