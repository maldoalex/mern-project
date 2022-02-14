import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/FormHook';
import './MomentForm.css'

// Move to FormHook.js
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case 'INPUT_CHANGE': 
//       let formIsValid = true;
//       for (const inputId in state.inputs) {
//         if (inputId === action.inputId) {
//           formIsValid = formIsValid && action.isValid;
//         } else {
//           formIsValid = formIsValid && state.inputs[inputId].isValid;
//         }
//       }
//       return {
//         ...state,
//         inputs: {
//         ...state.inputs,
//         [action.inputId]: {value: action.value, isValid: action.isValid}
//         },
//         isValid: formIsValid
//       };
//         default:
//       return state;
//   }
// };

const NewMoment = () => {
  // Move to FormHook.js
  // const [formState, dispatch] = useReducer(formReducer, {
  //   inputs: {
  //     title: {
  //       value: '',
  //       isValid: false
  //     },
  //     description: {
  //       value: '',
  //       isValid: false
  //     }
  //   },
  //     isValid: false
  // });
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, false);

  // Moved to FormHook.js 
  // const inputHandler = useCallback((id, value, isValid) => {
  //   dispatch({
  //     type: 'INPUT_CHANGE', 
  //     value: value, 
  //     isValid: isValid, 
  //     inputId: id
  //   })
  // },[]);

  // const descriptionInputHandler = useCallback((id, value, isValid) => {
  // },[]);

  const momentSubmitHandler = event =>{
  event.preventDefault();
  
  };

  return (
    <form className='moment-form' onSubmit={momentSubmitHandler}>
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
      <Button type="submit" disabled={!formState.isValid}>ADD MOMENT</Button>
    </form>
  )  
};

export default NewMoment;