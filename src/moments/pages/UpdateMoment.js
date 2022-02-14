import React from 'react';
import {useParams} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/FormHook';
import "./MomentForm.css";


const DUMMY_MOMENTS = [
  {
    id: "m1",
    title: "Tokyo Neighborhood",
    imageUrl:
      "https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRva3lvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Quiet and typical Tokyo neighborhood, view from hilltop.",
    location: {
      lat: 35.69569453472375,
      lng: 139.72287404998391,
    },
    creator: "u1",
  },
  {
    id: "m2",
    title: "Tokyo Sky Tree",
    imageUrl:
      "https://images.unsplash.com/photo-1545387652-dd48c403e0e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW8lMjBza3klMjB0cmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Tokyo Skytree is a broadcasting and observation tower in Sumida, Tokyo. It became the tallest structure in Japan in 2010 and reached its full height of 634 meters in March 2011, making it the tallest tower in the world.",
    location: {
      lat: 35.7100627,
      lng: 35.7100627,
    },
    creator: "u2",
  },
];

const UpdateMoment = () => {
  const momentId = useParams().momentId;

  const identifiedMoment = DUMMY_MOMENTS.find(m => m.id === momentId);

  const [formState, inputHandler] = useForm({
    title: {
      value: identifiedMoment.title,
      isValid: true
    },
    description: {
      value: identifiedMoment.description,
      isValid: true
    }
  }, true)

  const momentUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedMoment) {
    return (
      <div className='center'>
        <h2>Could not find moment!</h2>
      </div>
    )
  }

  return (
    <form className="moment-form" onSubmit={momentUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE MOMENT
      </Button>
    </form>
  );
};

export default UpdateMoment;