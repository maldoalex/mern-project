import React from 'react';
import { useParams } from 'react-router-dom';

import MomentList from '../components/MomentList';

const DUMMY_MOMENTS = [
  {
    id: "m1",
    title: "Tokyo Sky Tree",
    imageUrl:
      "https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRva3lvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Quiet and typical Tokyo neighborhood, view from hilltop.",
    location: {
      lat: 35.69569453472375,
      lng: 139.72287404998391
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

const UserMoments = props => {
  const userId = useParams().userId;
  const loadedMoments = DUMMY_MOMENTS.filter(moment => moment.creator === userId)
  return (
    <MomentList items={loadedMoments} />
  )
};

export default UserMoments;