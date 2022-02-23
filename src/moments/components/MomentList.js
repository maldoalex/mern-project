import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import MomentItem from './MomentItem';
import Button from '../../shared/components/FormElements/Button';
import './MomentList.css';

const MomentList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='moment-list center'>
        <Card>
          <h2>No moments found. Try creating one!</h2>
          <Button to='/moments/new'>Share Moment</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='moment-list'>
      {props.items.map(moment => (
        <MomentItem 
          key={moment.id} 
          id={moment.id} 
          image={moment.image} 
          title={moment.title}
          date={moment.date}
          description={moment.description} 
          address={moment.address}
          haikuone={moment.haikuone}
          haikutwo={moment.haikutwo}
          haikuthree={moment.haikuthree}
          coordinates={moment.location} 
          creatorId={moment.creator} 
          onDelete={props.onDeleteMoment}
        />
      ))}
    </ul>
  );
};

export default MomentList;