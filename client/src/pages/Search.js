import React, { useState, useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Track from "../components/Track";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import { Grid, Container, Button, TextField, List, ListItem } from '@material-ui/core';

function Search(props) {
  const [tracks, setTracks] = useState([]);
  const [formObject, setFormObject] = useState({});

  const { username, userID } = useContext(UserContext);

  function saveTrack(trackData) {
    API.saveTrack({
        videoID: trackData.videoID,
        title: trackData.title,
        channel: trackData.channel,
        published: trackData.published,
        description: trackData.description ? trackData.description : "",
        image: trackData.image ? trackData.image : "",
        user: userID
    })
      .then(res => console.log("Track saved!"))
      .catch(err => console.log(err));
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.query) {
      API.search(formObject.query)
      .then(res => {
        let results = res.data.items.map(element => {
          let snippet = element.snippet;
          let track = {
            videoID: element.id.videoId,
            title: snippet.title,
            channel: snippet.channelTitle,
            published: snippet.publishedAt,
            description: snippet.description ? snippet.description : "",
            image: snippet.thumbnails ? snippet.thumbnails.high.url : ""
          };
          return track;
        });
        setTracks(results);
      })
      .catch(err => console.log(err));
    }
  };

  return (
        <div>
          <Nav {...props} />
          <Container>
            <Grid container>
              <Grid item sm={12}>
                <Header>
                  Track Search
                </Header>
                <div id="notifications"></div>
                <div className="form">
                  <form>
                    <TextField
                      name="query"
                      id="query"
                      onChange={handleInputChange}
                      label="Search on YouTube"
                      variant="outlined"
                      fullWidth />
                    <Button
                      id="submit-btn"
                      variant="contained"
                      disabled={!(formObject.query)}
                      onClick={handleFormSubmit}
                      color="primary">
                      Submit Track
                    </Button>
                  </form>
                </div>
              </Grid>
              <Grid item sm={12}>
                <h2>Search Results</h2>
                <div className="search-results-container">
                  {tracks.length ? (
                    <List>
                      {tracks.map(track => (
                        <ListItem key={track.videoID}>
                          <Track
                            videoID={track.videoID}
                            title={track.title}
                            channel={track.channel}
                            published={track.published}
                            description={track.description}
                            image={track.image}
                            user={userID}
                            type="searchResult"
                            saveTrack={saveTrack} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <h3>No Results to Display</h3>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
  );
}

export default Search;
