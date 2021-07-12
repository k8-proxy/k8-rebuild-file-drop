import React, {useEffect}       from "react";
import DragDrop                 from "./components/dragdrop/DragDrop";
// import ProcessingResult         from "./components/results/ProcessingResult";
import RebuildFilesReady        from "./components/results/RebuildFilesReady";
import ViewResult               from "./components/viewresults/ViewResult";
import UploadingLoader          from "./components/loader/UploadingLoader";
import { usePromiseTracker }    from "react-promise-tracker";
import leftarrow                from '../../assets/left-arrow.png';
import                                "./Filedrop.css";



export default function FileDrop() {
  const { promiseInProgress } = usePromiseTracker({ delay: 100 });
  const [processed, setProcessed] = React.useState([]);
  const [unprocessed, setUnprocessed] = React.useState([]);
  const [isActive, setActive] = React.useState(false);
  const [reset, doRest] = React.useState(false);
  


  useEffect(() => {
    setProcessed([]);
 }, [reset])

  const setAnalysisResult = (data) => {
    console.log("processed" + processed)
    setProcessed(prev => ([...prev, data]));
  };

  const dropAnotherFile = () => {
    setProcessed([]);
  };

  const hideRightBanner = () => {
    setActive(!isActive);
  };

  const getRightBanner=()=>{
    return(       
    <div className="stactic-banner">
      <div className={isActive ? 'your_className': null}>
    <div className="left-ban">
      <button onClick={hideRightBanner} className="bannerCloseButton"><img src={leftarrow} className="left-arrow" alt="Arrow"/></button>
      <div className="banner-text">
        <h2>Test drive <br></br>Glasswall CDR</h2>
        <p className="desktop-text-cdr">
          Watch our CDR platform instantly clean and rebuild one of your
          files. Simply upload your own file (or drag and drop a sample
          file from below) to get started.
        </p>
      </div>
      <p className="mobile-text-cdr">
        Watch our CDR platform instantly clean and rebuild one of your
        files. Simply upload your own file to get started.
      </p>
    </div>
    </div>
  </div>
  )
  }

  return (
    <>
      <div className="containerWrap">
        <div className="row">
          <div className="filedropLeft">
            <div className="stactic-banner">
              <DragDrop
                setAnalysisResult={setAnalysisResult}
                results = {processed}
              />
              {processed.length > 0 && <ViewResult dropAnotherFile={dropAnotherFile}/>}
              {promiseInProgress && <UploadingLoader />}
            </div>
            {/* {processingResult && <ProcessingResult /> } */}
          </div>
          <div className="filedropRight">
            {processed.length == 0 ? (
              getRightBanner()
            ) : (
              <RebuildFilesReady
                rebuildFiles={processed}
                unprocessed ={unprocessed}
                dropAnotherFile={dropAnotherFile}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
