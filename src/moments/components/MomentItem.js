import React, {useState, useContext, Fragment} from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {AuthContext} from '../../shared/context/AuthContext';
import {useHttpClient} from '../../shared/hooks/HttpHook';
import "./MomentItem.css";

const MomentItem = props => {
  const {isLoading, sendRequest, error, clearError} = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/moments/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) { }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={props.address}
        contentClass="moment-item__modal-content"
        footerClass="moment-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
       >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal 
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?" 
        footerClass="moment-item__modal-actions"
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </Fragment>
        }
      >
        <p>Do you want to proceed and delete this moment? This action cannot be undone.</p>
      </Modal>
      <li className="moment-item">
        <Card className="moment-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
          <div className="moment-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div>
          <div className="moment-item__info">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <h5>{props.address}</h5>
            <h5>{props.date}</h5>
          </div>
          <div className="moment-item__info">
            <p>{props.haikuone}</p>
            <p>{props.haikutwo}</p>
            <p>{props.haikuthree}</p>
          </div>
          <div className="moment-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.userId === props.creatorId && (
              <Button to={`/moments/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default MomentItem;
