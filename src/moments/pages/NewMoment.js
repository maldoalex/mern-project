import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewMoment.css'

const NewMoment = () => {
  return (
    <form className='moment-form'>
      <Input element="input" type="text" label="Title" />
    </form>
  )  
};

export default NewMoment;