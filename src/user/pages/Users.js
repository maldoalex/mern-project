import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{
    id: 'u1',
    name: 'Alex Maldonado',
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRva3lvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    moments: 3,
  }];

  return (
    <UsersList items={USERS} />
  )
};

export default Users;