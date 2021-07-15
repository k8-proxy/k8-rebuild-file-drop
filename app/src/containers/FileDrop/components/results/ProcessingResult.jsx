import React            from "react";
import fileimg          from "../../../../assets/icon-certificate.png";
import ButtonComponent  from "../Button/Button/Button";
import cancelIcon       from "../../../../assets/cross.svg";
import tick             from "../../../../assets/tick.png";
import { engineApi }    from "../../../../api";

import                       "./ProcessingResult.css";
import { useState } from "react";

export default function ProcessingResult({
  file,
  analysisReport,
  analysisReportString,
  validation,
  onAnotherFile,
  hideResult,
}) {

  const [showLoader, SetShowLoader] = useState(false);

  const getFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const getAnalysisReport = (analysisReport) => {
    // debugger;
    const binaryData = [];
    binaryData.push(analysisReportString);
    let url = window.URL.createObjectURL(
      new Blob(binaryData, { type: "text/xml" })
    );
    let a = document.createElement("a");
    a.href = url;
    a.download = file.name + ".xml";
    a.click();
  };

  const getProtectedFile = () => {
    // debugger;
    SetShowLoader(true);
      engineApi
        .protectFile(file)
        .then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = file.name;
          a.click();
          SetShowLoader(false);
        })
        .catch((error) => {
          // debugger;
          console.log(error.message);
          SetShowLoader(false);
        })
  
  };

  const getItems = (list) => {
    // var items = ;
    return;
    //   var result = items.map((item, index)=>{
    //     var data = items[index];
    //     var tag = data.getElementsByTagName('gw:TechnicalDescription');
    //     var tagIndex = tag[0]
    //     var content = tagIndex.value

    // })
    // for (var i = 0; i < items.length; i++) {

    // }
    // return result;
  };

  if (file && analysisReport) {
    const sanitisations = analysisReport.getElementsByTagName(
      "gw:SanitisationItem"
    );
    console.log("sanitisations  length" + sanitisations.length);
    const _remediations = analysisReport.getElementsByTagName("gw:RemedyItem");
    // const _remediations = Object.values(remediations).filter(obj =>
    //   obj.textContent && obj.textContent.length > 0
    // );

    console.log(" remediations.length" + _remediations.length);

    const issues = analysisReport.getElementsByTagName("gw:IssueItem");
    const [{ value: fileType } = { value: "unknown" }] =
      analysisReport.getElementsByTagName("gw:FileType");
    const { name: fileName } = file;
    const hasIssues = !!issues.length;

    return (
      <>
        <div id="cleanSection" className="cleansection">
          <div className="container">
            <div className="clean-section">
              <div className="inner-grabox processing-result">
                <h3>
                  Processing Result  {sanitisations.length == 0 &&  _remediations.length == 0 && "   -    File is Clean!"}
                  <ButtonComponent
                    classname={"closeResult"}
                    imgsrc={cancelIcon}
                    loader = {false}
                    onClicked={() => {
                      hideResult();
                    }}
                  />
                </h3>
                <div className="mp-padding">
                  <div className="file-img">
                    <img src={fileimg} alt="" />
                  </div>
                  <ul>
                    <li>
                      <span className="left-inner">
                        <span className="file_label">File name:</span>
                        <span className="file_name">{file.name}</span>
                      </span>
                      <span id="_filename" className="right-inner"></span>
                    </li>
                    <li>
                      <span className="left-inner">
                        <span className="file_label">File size:</span>
                        <span className="file_name">
                          {getFileSize(file.size)}
                        </span>
                      </span>
                      <span id="_filesize" className="right-inner"></span>
                    </li>
                    <li>
                      <span className="left-inner">
                        <span className="file_label">Type:</span>
                        <span className="file_name"> {fileType}</span>
                      </span>
                      <span id="_filetype" className="right-inner"></span>
                    </li>
                  </ul>
                  <div className="two-btn">
                    <ButtonComponent
                      text={"Download Clean File"}
                      classname={"green"}
                      loader = {showLoader}
                      onClicked={() => {
                        getProtectedFile();
                      }}
                    />
                    <ButtonComponent
                      text={"XML Report"}
                      loader = {false}
                      onClicked={() => {
                        getAnalysisReport();
                      }}
                    />
                  </div>
                  <div className="clear"></div>
                </div>
                {sanitisations.length >= 0 && (
                  <div className="inner-grabox">
                    <h3>Risky Content Cleaned</h3>
                    <ul id="_sanitisedItems">
                      {sanitisations.length > 0 ? (
                        sanitisations.map((item) => (
                          <li>
                            <img src={tick} className="tick-li" alt="tick" />
                            <span>{item.children[0].value}</span>
                          </li>
                        ))
                      ) : (
                        <li>
                          <img src={tick} className="tick-li" alt="tick" />
                          <span>Document meets risk policy</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {_remediations.length > 0 && (
                  <div className="inner-grabox">
                    <h3>Objects and Structures Rebuilt</h3>
                    <ul id="_remedyItems">
                      {_remediations.map((item) => (
                        <li>
                          <img src={tick} className="tick-li" alt="tick" />
                          <span> {item.children[0].value} </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
