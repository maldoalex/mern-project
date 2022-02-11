import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./MomentItem.css";

const MomentItem = props => {
  return (
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
          <Button inverse>VIEW ON MAP</Button>
          <Button to={`/moments/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default MomentItem;
