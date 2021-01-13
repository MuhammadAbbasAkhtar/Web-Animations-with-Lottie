import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    // margin: theme.spacing(0,25,0,25),
    backgroundColor: '#424242',
    color: 'white'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'white'
  },
  iconButton: {
    padding: 10,
    color: 'white'
  },
  divider: {
    height: 28,
    margin: 4,
  },
  
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <>
    
    <Paper component="form" className={classes.root}>
     
      <InputBase
        className={classes.input}
        placeholder="Paste JSON here"
        inputProps={{ 'aria-label': 'Paste JSON here' }}
        inputRef={props.inputRef}
        error={props.error}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="add"  onClick={props.cb}>
        <AddRoundedIcon />
      </IconButton>
      
    </Paper>
    </>
  );
}