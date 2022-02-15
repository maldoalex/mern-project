import React, {useState, Fragment} from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import "./MomentItem.css";

const MomentItem = props => {
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

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <Fragment>
      <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={props.title}
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
          <div className="moment-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="moment-item__info">
            <h2>{props.title}</h2>
            <h3>{props.date}</h3>
            <p>{props.description}</p>
          </div>
          <div className="moment-item__info">
            <p>{props.haikuone}</p>
            <p>{props.haikutwo}</p>
            <p>{props.haikuthree}</p>
          </div>
          <div className="moment-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/moments/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default MomentItem;
