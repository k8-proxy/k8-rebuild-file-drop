import React              from 'react'
import fileimg            from "../../../assets/icon-certificate.png";
import ButtonComponent    from '../button/Button';
import cancelIcon         from '../../../assets/cancel.png'
import                          "../Filedrop.css";

export default function ProcessingResult(){
  
    return(
        <>
        <div id="cleanSection" className="cleansection">
              <div className="container">
                <div className="clean-section">
                  <div className="inner-grabox processing-result">
                    <h3>
                      Processing Result
                      <ButtonComponent classname={'closeResult'} imgsrc={cancelIcon} />
                    </h3>
                    <div className="mp-padding">
                      <div className="file-img">
                        <img src={fileimg} alt="" />
                      </div>
                      <ul>
                        <li>
                          <span className="left-inner">File name:</span>
                          <span id="_filename" className="right-inner"></span>
                        </li>
                        <li>
                          <span className="left-inner">File size:</span>
                          <span id="_filesize" className="right-inner"></span>
                        </li>
                        <li>
                          <span className="left-inner">Type:</span>
                          <span id="_filetype" className="right-inner"></span>
                        </li>
                      </ul>
                      <div className="two-btn">
                      <ButtonComponent text={"Download Clean File"} classname={"green"} />
                      <ButtonComponent text={"XML Report"} />
                      </div>
                      <div class="clear"></div>
                    </div>

                    <div className="inner-grabox">
                      <h3>Risky Content Cleaned</h3>
                      <ul id="_sanitisedItems"></ul>
                    </div>
                    <div className="inner-grabox">
                      <h3>Objects and structures rebuilt</h3>
                      <ul id="_remedyItems"></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}