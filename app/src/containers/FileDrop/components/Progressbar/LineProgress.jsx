
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#0db091',
  }
});

export default function LineProgress(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={props.value}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    </div>
  );
}