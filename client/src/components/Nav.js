import React from "react";
import { AppBar, Toolbar, Typography, Icon } from '@material-ui/core';
import API from "../utils/API";

function Nav(props) {    
  function logout() {
    API.logout();
    props.updateUser({
      loggedIn: false,
      username: null,
      userID: null
    });
  }
  
  return (
    <AppBar position="static">
      <Toolbar>
        <a href="/">
          <Typography variant="h6">
            <Icon className="fas fa-file-audio" /> 
            Audiophile
          </Typography>
        </a>
        <a href="/search">Search</a>
        <a href="/queue">Queue</a>
        <a href="/library">Library</a>
        <button onClick={() => logout()}>Logout</button>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
