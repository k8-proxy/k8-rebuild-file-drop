import React      from 'react'
import Table      from '@material-ui/core/Table';
import TableBody  from '@material-ui/core/TableBody';
import TableCell  from '@material-ui/core/TableCell';
import TableRow   from '@material-ui/core/TableRow';
import                  "../Filedrop.css";


export default function RebuildTable(props){
    return(
        <>
        <Table className="rebiuldTable" aria-label="simple table">
        <TableBody>
          {props.rebuildFiles.map((row) => (
            <TableRow key={row.file.name}>
              <TableCell  style={{width: '40%'}} component="th" scope="row">
                {row.file.name.length> 20?  row.file.name.substring(0,20):  row.file.name}
              </TableCell>
              <TableCell style={{width: '30%'}} align="right"><button className="tableBtns viewResultBtn">View Result</button></TableCell>
              <TableCell style={{width: '30%'}} align="right"><button className="tableBtns downLoadCleanFilesBtn">Download Clean File</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </>
    )
}