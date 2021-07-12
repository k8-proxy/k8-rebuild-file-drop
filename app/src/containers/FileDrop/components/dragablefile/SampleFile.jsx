import React from "react";

export default function SampleFile(props) {
  return (
    <>
      <li>
        <a href={props.link}>
          <img src={props.imgsrc} alt="" />
          <p>{props.text}</p>
        </a>
      </li>
    </>
  );
}
