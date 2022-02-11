import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import MomentItem from './MomentItem';
import './MomentList.css';

const MomentList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='moment-list center'>
        <Card>
          <h2>No moments found. Try creating one!</h2>
          <button>Share Moment</button>
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
          image={moment.imageUrl} 
          title={moment.title}
          date={moment.date}
          description={moment.description} 
          coordinates={moment.location} 
          creatorId={moment.creator} 
        />
      ))}
    </ul>
  );
};

export default MomentList;