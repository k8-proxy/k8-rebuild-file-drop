import React                    from "react";
import DragDrop                 from "./components/DragDrop";
// import ProcessingResult         from "./components/ProcessingResult";
import RebuildFilesReady        from "./components/RebuildFilesReady";
import ViewResult               from "./components/ViewResult";
import DragableFile             from "./components/DragableFile";
import ProgressBar              from "./components/ProgressBar";
import UploadingLoader          from "./components/UploadingLoader";
import { usePromiseTracker }    from "react-promise-tracker";
import classes                  from "./FileDrop.module.css";
import                                "./Filedrop.css";



export default function FileDrop() {
  const { promiseInProgress }    = usePromiseTracker({delay: 100});
  const [ results, setResults ]  = React.useState([]);
  const [ processingResult, setProcessingResult ]  = React.useState(false);
  

  const setAnalysisResult =(data)=>{
    var list  = results;
    list.push(data);
    setResults(list);
  }  

  const dropAnotherFile = () => {
    setResults([]);
    console.log("results" + results.length)

  }
  const getRightBanner=()=>{
    return(       
    <div className="stactic-banner">
    <div className="left-ban">
      <h2>Test drive Glasswall CDR</h2>
      <p className="desktop-text-cdr">
        Watch our CDR platform instantly clean and rebuild one of your
        files. Simply upload your own file (or drag and drop a sample
        file from below) to get started.
      </p>
      <p className="mobile-text-cdr">
        Watch our CDR platform instantly clean and rebuild one of your
        files. Simply upload your own file to get started.
      </p>
    </div>
  </div>
  )
  }

  return (
    <>
      <div className={classes.containerWrap}>
        <div className={classes.row}>
          <div className={classes.filedropLeft}>
            <div className="stactic-banner">
              <DragDrop setAnalysisResult={setAnalysisResult} results = {results}/>
              {results.length > 0 && <ViewResult setResults = {setResults}/> }
              {promiseInProgress && <UploadingLoader />}
              {/* {(promiseInProgress ||  results.length > 0)  && <ProgressBar status ={promiseInProgress}/>} */}
              {/* <DragableFile /> */}
            </div>
            {/* {processingResult && <ProcessingResult /> } */}

          </div>
          <div className={classes.filedropRight}>
          {results.length == 0 ?getRightBanner() 
          :<RebuildFilesReady rebuildFiles ={results} dropAnotherFile = {dropAnotherFile} /> }
          </div>
        </div>
      </div>
    </>
  );
}
