import React from "react";

export default function SampleFile(props) {
  return (
    <>
      <li key={props.index}>
        <div draggable onDragStart ={()=>props.setSampleFile(props.link)}>
          <a href={props.link}>
            <img src={props.imgsrc} alt="" />
            <p>{props.text}</p>
          </a>
        </div>
       
      </li>
    </>
  );
}
