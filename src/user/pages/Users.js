import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Alex Maldonado",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEkAO3NjmrhH75wWrcfNGZ66reLDY4xqIrXg&usqp=CAU",
      moments: 3,
    },
  ];

  return (
    <UsersList items={USERS} />
  )
};

export default Users;