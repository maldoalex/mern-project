import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/FormHook';
import { useHttpClient } from '../../shared/hooks/HttpHook';
import { AuthContext } from '../../shared/context/AuthContext';
import './MomentForm.css'

const NewMoment = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
    image: {
      value: '',
      isValid: false
    },
    date: {
      value: '',
      isValid: false
    },
    haikuone: {
      value: '',
      isValid: false
    },
    haikutwo: {
      value: '',
      isValid: false
    },
    haikuthree: {
      value: '',
      isValid: false
    },
  }, false);

  const history = useHistory();

  const momentSubmitHandler = async event =>{
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('date', formState.inputs.date.value);
      formData.append('haikuone', formState.inputs.haikuone.value);
      formData.append('haikutwo', formState.inputs.haikutwo.value);
      formData.append('haikuthree', formState.inputs.haikuthree.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/moments',
        'POST',
        formData,
        {Authorization: 'Bearer ' + auth.token}
      );
      history.push('/');
    } catch (err ) { }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='moment-form' onSubmit={momentSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input 
          id="title"
          element="input" 
          type="text" 
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input 
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 charcters)."
          onInput={inputHandler}
        />
        <Input 
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input 
          id="date"
          element="input" 
          type="text" 
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
        <Input 
          id="haikuone"
          element="input" 
          type="text" 
          label="Haiku-Line 1(5 syllables)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text for line 1."
          onInput={inputHandler}
        />
        <Input 
          id="haikutwo"
          element="input" 
          type="text" 
          label="Haiku-Line 2(7 syllables)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text for line 2."
          onInput={inputHandler}
        />
        <Input 
          id="haikuthree"
          element="input" 
          type="text" 
          label="Haiku-Line 3(5 syllables)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text for line 3."
          onInput={inputHandler}
        />
        <ImageUpload 
          id="image" 
          onInput={inputHandler} 
          errorText="Please provide an image." 
        />
        <Button type="submit" disabled={!formState.isValid}>ADD MOMENT</Button>
      </form>

    </React.Fragment>
  )  
};

export default NewMoment;