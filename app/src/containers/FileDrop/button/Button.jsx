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
        <img src={props.imgsrc} alt="" /> {props.text}
      </button>
    </>
  );
}
