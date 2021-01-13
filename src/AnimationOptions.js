import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';

export default function AnimationOptions(props) {
 
  const handleChange = (event) => {
    //setState({ checkedA: event.target.checked });
    props.setCheck(event.target.checked)
  };

  return (
    <>
     
     <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
       
      <FormControlLabel
          control={<Switch color="primary" checked={props.checked} onChange={handleChange} />}
          label={`Loop : ${props.checked}`}
           labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
     
    </> 
  );
}