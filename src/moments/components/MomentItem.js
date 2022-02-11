import React from "react";

import Card from "../../shared/components/UIElements/Card";
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
          <button>VIEW</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default MomentItem;
