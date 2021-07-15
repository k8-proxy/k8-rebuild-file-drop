import React, {useEffect, useState} from "react";
import DragDrop                     from "./components/Dragdrop/DragDrop";
import ProcessingResult             from "./components/Results/ProcessingResult";
import RebuildFilesReady            from "./components/Results/RebuildFilesReady";
import ViewResult                   from "./components/Viewresults/ViewResult";
import UploadingLoader              from "./components/Loader/UploadingLoader";
import { usePromiseTracker }        from "react-promise-tracker";
import leftarrow                    from '../../assets/left-arrow.png';
import                                    "./Filedrop.css";
import { engineApi }                from "../../api";


export default function FileDrop() {
  const { promiseInProgress } = usePromiseTracker({ delay: 100 });

  const [processed, setProcessed] = React.useState([]);
  const [unprocessed] = React.useState([]);

  const [isActive, setActive] = React.useState(false);

  const [resultIndex, setResultIndex] = React.useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [progressInfo, setProgressInfo] = useState(0);
  const [rebuildTime, setRebuildTime] = useState(0);
  

  useEffect(()=>{
    if(progressInfo === 100){
      console.log("upload completed")
      setRebuildTime(new Date().getTime())
    }
  }, [progressInfo])
  const setAnalysisResult = (data) => {
    console.log("processed" + processed);
    setProcessed((prev) => [...prev, data]);
  };

  const dropAnotherFile = () => {
    setProcessed([]);
    setShowResult(false);
  };

  const hideRightBanner = () => {
    setActive(!isActive);
  };

  const viewResultHandler = (index) => {
    setResultIndex(index);
    setShowResult(true);
  };

  const getProtectedFile = (index) => {
    // debugger;
    var file = processed[index].file;
    engineApi
      .protectFile(file)
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
      })
      .catch((error) => {
        // debugger;
        console.log(error.message);
      });
  };
  
  const downloadAllCleanFiles = () => {
    getProtectedFile(0);
  };

  const hideResult = () => {
    console.log("hideResult");
    setShowResult(false);
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
            {!showResult && <div className="stactic-banner">
              <DragDrop
                setAnalysisResult={setAnalysisResult}
                results = {processed}
                dropAnotherFile={dropAnotherFile}
                progressInfo = {progressInfo}
                setProgressInfo = {setProgressInfo}
                setProgressInfo = {setProgressInfo}
                rebuildStartTime = {rebuildTime}
              />
              {processed.length > 0 && <ViewResult dropAnotherFile={dropAnotherFile}/>}
              {promiseInProgress && <UploadingLoader />}
            </div>}
            {showResult && 
            <ProcessingResult 	
                file={processed[resultIndex].file}
								analysisReport={processed[resultIndex].analysisReport}
								analysisReportString={processed[resultIndex].analysisReportString}
								validation={false}
								onAnotherFile={dropAnotherFile}
								hideResult={hideResult}
                /> 
                }
          </div>
          <div className="filedropRight">
            {processed.length === 0 ? (
              getRightBanner()
            ) : (
              <RebuildFilesReady
                rebuildFiles={processed}
                unprocessed ={unprocessed}
                dropAnotherFile={dropAnotherFile}
                viewResult = {viewResultHandler}
                downloadClean = {getProtectedFile}
                downloadAllCleanFiles = {downloadAllCleanFiles}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
