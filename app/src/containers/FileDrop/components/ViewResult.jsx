import React            from "react";
import docicon          from "../../../assets/icon-documents-tick.png";
import refreshicon      from "../../../assets/refresh.png";
import ButtonComponent  from "../button/Button";
import                  "../Filedrop.css";

export default function ViewResult(props) {
  return (
    <>
      <div id="_viewresult">
        <ButtonComponent
          id={"refreshBtn"}
          imgsrc={refreshicon}
          classname={"refresh"}
          onClicked ={()=>{props.setResults([])}}
        />
        <div className="img-successful">
          <img src={docicon} alt="" />
        </div>
        <div className="file-text-3">Your files have been processed</div>
      </div>
    </>
  );
}
