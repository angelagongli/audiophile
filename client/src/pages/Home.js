import React, { useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import UserContext from "../utils/userContext";
import { Grid, Container } from '@material-ui/core';

function Home(props) {
  const { username, userID } = useContext(UserContext);

  return (
    <div>
      <Nav {...props} />
      <Header>
        Welcome back, {username}! What do you want to do?
      </Header>
      <div id="notifications"></div>
      <Container>
        <Grid container>
          <Grid item sm={4}>
            <div className="action">
              <h2>
                Search Track
              </h2>
              <a href="/search">
                <i id="search-icon" className="fas fa-satellite-dish"></i>
                <i id="search-icon-hover" className="fas fa-volume-up"></i>
              </a>
            </div>
          </Grid>
          <Grid item sm={4}>
            <div className="action">
              <h2>
                View Queue
              </h2>
              <a href="/queue">
                <i id="queue-icon" className="fas fa-hourglass-start"></i>
                <i id="queue-icon-hover" className="fas fa-hourglass-half"></i>
              </a>
            </div>
          </Grid>
          <Grid item sm={4}>
            <div className="action">
              <h2>
                Play Conversation
              </h2>
              <a href="/library">
                <i id="play-icon" className="fas fa-play-circle"></i>
                <i id="play-icon-hover" className="fas fa-play"></i>
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
  
}

export default Home;
