import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/FormHook';
import { useHttpClient } from '../../shared/hooks/HttpHook';
import {AuthContext} from '../../shared/context/AuthContext';
import "./MomentForm.css";

const UpdateMoment = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedMoment, setLoadedMoment] = useState();
  const momentId = useParams().momentId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, false)

  useEffect(() => {
    const fetchMoment = async () => {
      try {
        const responseData = await sendRequest(
          // `http://localhost:5000/api/moments/${momentId}`
          `${process.env.REACT_APP_BACKEND_URL}/moments/${momentId}`
        );
        setLoadedMoment(responseData.moment);
        setFormData(
        {
          title: {
            value: responseData.moment.title,
            isValid: true,
          },
          description: {
            value: responseData.moment.description,
            isValid: true,
          },
        },
        true
      );
      } catch (err) {}
    };
    fetchMoment();
  }, [sendRequest, momentId, setFormData]);


  const momentUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        // `http://localhost:5000/api/moments/${momentId}`,
        `${process.env.REACT_APP_BACKEND_URL}/moments/${momentId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push('/' + auth.userId + '/moments');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )
  }
  if (!loadedMoment && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find moment!</h2>
        </Card>
      </div>
    )
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedMoment && (
        <form className="moment-form" onSubmit={momentUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedMoment.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedMoment.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE MOMENT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateMoment;