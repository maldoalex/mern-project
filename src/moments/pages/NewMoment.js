import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import './NewMoment.css'

const NewMoment = () => {
  return (
    <form className='moment-form'>
      <Input 
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
       />
    </form>
  )  
};

export default NewMoment;