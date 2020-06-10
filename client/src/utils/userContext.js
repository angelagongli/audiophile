import React from "react";

const UserContext = React.createContext({
  username: null,
  userID: null
});

export default UserContext;