import React, { useState, useEffect, useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Conversation from "../components/Conversation";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import { Grid, Container, List, ListItem } from '@material-ui/core';

function Library(props) {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    loadConversations();
  }, []);

  const { username, userID } = useContext(UserContext);

  function loadConversations() {
    API.getUserConversations(userID)
      .then(res => {
        setConversations(res.data);
      })
      .catch(err => console.log(err));
  };

  function deleteConversation(id) {
    API.deleteConversation(id)
      .then(res => loadConversations())
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Nav {...props} />
      <Container>
        <Grid container>
          <Grid item sm={12}>
            <Header>
              My Conversation List
            </Header>
            <div id="notifications"></div>
            <div>
              {conversations.length ? (
                <List>
                  {conversations.map(conversation => (
                    <ListItem key={conversation._id}>
                      <Conversation
                        id={conversation._id}
                        track={conversation.track}
                        maker={conversation.maker}
                        joiner={conversation.joiner}
                        deleteConversation={deleteConversation} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Conversations Yet</h3>
              )}
            </div>
          </Grid>
        </Grid>      
      </Container>
    </div>
  );
}

export default Library;
