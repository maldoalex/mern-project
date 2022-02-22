import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import MomentList from '../components/MomentList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/HttpHook';

const UserMoments = props => {
  const [ loadedMoments, setLoadedMoments] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchMoments = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/moments/user/${userId}`
        );
        setLoadedMoments(responseData.moments);
      } catch (err) {}
    };
    fetchMoments();
  }, [sendRequest, userId]);

  const momentDeletedHandler = (deletedMomentId) => {
    setLoadedMoments(prevMoments => 
      prevMoments.filter(moment => moment.id !== deletedMomentId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMoments && <MomentList items={loadedMoments} onDeleteMoment={momentDeletedHandler} />}
    </React.Fragment>
  )
};

export default UserMoments;