import React, { useState, useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import Nav from "../components/Nav";
import Header from "../components/Header";
import Track from "../components/Track";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import { Grid, Container, List, ListItem } from '@material-ui/core';

function Queue(props) {
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const [toPlay, setToPlay] = useState(false);
  const [playID, setPlayID] = useState();
  
  useEffect(() => {
    loadTracks();
    loadUsers();
  }, []);

  const { username, userID } = useContext(UserContext);

  function loadTracks() {
    API.getTracks(userID)
      .then(res => 
        setTracks(res.data.filter(element => element.started === false))
      )
      .catch(err => console.log(err));
  };

  function loadUsers() {
    API.getAllUsers()
      .then(res => {
        setUsers(res.data.filter(element => element._id !== userID ))
      })
      .catch(err => console.log(err));
  };
  
  function startConversation(trackID, chosenID) {
    API.updateTrack(trackID, { started: true })
      .then(res => {
        loadTracks();
        API.makeConversation({
          track: trackID,
          maker: userID,
          joiner: chosenID
        })
          .then(res => {
            console.log("Conversation started!");
            setPlayID(res.data._id);
            setToPlay(true);
          });
      })
      .catch(err => console.log(err));
  }

  function deleteTrack(id) {
    API.deleteTrack(id)
      .then(res => loadTracks())
      .catch(err => console.log(err));
  }

  return (
    toPlay === true ? <Redirect to={{ pathname: "/play/" + playID }} /> :
    <div>
      <Nav {...props} />
      <Container>
        <Grid container>
          <Grid item sm={12}>
            <Header>
              My Track List
            </Header>
            <div id="notifications"></div>
            <div>
              {tracks.length ? (
                <List>
                  {tracks.map(track => (
                    <ListItem key={track.videoID}>
                      <Track
                        id={track._id}
                        videoID={track.videoID}
                        title={track.title}
                        channel={track.channel}
                        published={track.published}
                        description={track.description}
                        image={track.image}
                        users={users}
                        type="savedTrack"
                        startConversation={startConversation}
                        deleteTrack={deleteTrack} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Saved Tracks</h3>
              )}
            </div>
          </Grid>
        </Grid>      
      </Container>
    </div>
  );
}

export default Queue;
