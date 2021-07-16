import React, {useState}  from 'react'
import Table              from '@material-ui/core/Table';
import TableBody          from '@material-ui/core/TableBody';
import TableCell          from '@material-ui/core/TableCell';
import TableRow           from '@material-ui/core/TableRow';
import { engineApi }      from "../../../../../api";
import LinkButton         from '../../Button/LinkButton/LinkButton';
import                          "./RebuildTable.css";



export default function RebuildTable(props){
  const[showLaoder, SetShowLoader] = useState(false)
   
  const getProtectedFile = (file) => {
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
          console.log(error.message);
          SetShowLoader(false);
        })
  
  };

  return(
        <>
        <Table className="rebiuldTable" aria-label="simple table">
        <TableBody>
          {props.rebuildFiles.map((row, index) => (
            <TableRow key={row.file.name}>
              <TableCell  style={{width: '35%'}} component="th" scope="row" title={row.file.name}>
                {row.file.name.length> 20?  row.file.name.substring(0,20):  row.file.name}
              </TableCell>
              <TableCell onClick={()=>{props.viewResult(index)}} style={{width: '25%'}} align="right"><LinkButton loader={false}  text ={"View Result"} color ={"#c22969"} /></TableCell>
              <TableCell onClick={()=>{getProtectedFile(row.file)}} style={{width: '40%'}} align="right"><LinkButton loader={showLaoder}  text ={"Download Clean File"} color ={"#0db091"} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </>
    )
}