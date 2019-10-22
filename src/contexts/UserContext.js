import React from 'react';

const UserContext = React.createContext({
    user: {
        firstname: '',
        surname: '',
        tag: ''
    },
  onSubmit: () => {}
});

export default UserContext;
