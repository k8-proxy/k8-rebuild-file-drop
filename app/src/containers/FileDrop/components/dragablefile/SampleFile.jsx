import React from "react";

export default function SampleFile(props) {

  console.log("props.key" + props.index)
  const getStyle=()=>{
    console.log("getStyle" + props.index)
    if(props.index>3){
      return { pointerEvents: 'none'}
    }else{
      return { pointerEvents: 'cursor'}
    }
  }
  return (
    <>
      <li key={props.index} >
      <div style={ getStyle()} draggable onDragStart ={()=>props.setSampleFile(props.link)}>
              <a href={props.link}>
            <img src={props.imgsrc} alt="" />
            <p>{props.text}</p>
          </a>
        </div>
       
      </li>
    </>
  );
}
