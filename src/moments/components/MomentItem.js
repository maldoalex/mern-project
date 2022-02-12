import React, {useState, Fragment} from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import "./MomentItem.css";

const MomentItem = props => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

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
          <h2>THE MAP!</h2>
        </div>
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
          <div className="moment-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/moments/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default MomentItem;
