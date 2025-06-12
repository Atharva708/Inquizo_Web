import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function Mytextfield(props) {
  const {label, placeholder, name, control} = props

  return (

    <Controller>
      
    name = {name}
    control = {control}  

    render = {({
      field: { onChange, value },
      fieldState: { error },
      formState,
    

     }) => (
     
      <TextField
      required
      id="outlined-required"
      label= {label}
      defaultValue="Hello World"
      variant="standard"
      placeholder={placeholder}
    />
    )
    
    }
  </Controller>
  );
}
