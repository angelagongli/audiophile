import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AppBar, Toolbar, Typography, Icon, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import UserContext from "../utils/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightmostLeft: {
    flexGrow: 1,
  },
}));

function Nav(props) {    
  const { username, userID } = useContext(UserContext);
  const classes = useStyles();
  
  function logout() {
    API.logout();
    props.updateUser({
      loggedIn: false,
      username: null,
      userID: null
    });
    return <Redirect to={{ pathname: "/" }} />
  }
  
  return (
    <div className={classes.root}>
      <AppBar className="nav" position="static">
        <Toolbar>
          <Icon className="fas fa-file-audio" /> 
          <a href="/">
            <Typography variant="h6">
              Audiophile
            </Typography>
          </a>
          <a href="/search">Search</a>
          <a href="/queue">Queue</a>
          <a href="/library" className={classes.rightmostLeft}>Library</a>
          <div className="login-info">
            <Typography variant="body2">
              Logged in as <span className="user-span" userid={userID}>{username}</span>
            </Typography>
          </div>
          <Button variant="contained" color="secondary" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
