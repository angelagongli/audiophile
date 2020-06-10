import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Comment from "../components/Comment";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import { Grid, Container, Button, TextField, List, ListItem } from '@material-ui/core';

function Text(props) {
  const [comments, setComments] = useState([]);
  const [formObject, setFormObject] = useState({});

  useEffect(() => {
    loadComments();
  }, []);

  const { username, userID } = useContext(UserContext);

  function loadComments() {
    API.getComments(props.id)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.log(err));
  };

  function deleteComment(id) {
    API.deleteComment(id)
      .then(res => loadComments())
      .catch(err => console.log(err));
  }

  function editComment(id, commentData) {
    API.updateComment(id, commentData)
      .then(res => loadComments())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.text) {
        API.saveComment({
            user: userID,
            text: formObject.text,
            time: props.currentTime,
            conversation: props.id
        })
        .then(res => loadComments())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item sm={12}>
          <Header>
            Join the Conversation
          </Header>
          <div id="notifications">
            emitted comment by {props.commentInfo.user} at {props.commentInfo.time} detected, forcing re-render 
            text component re-renders at {props.currentTime}
          </div>
          <div className="comments-container">
            {comments.length ? (
              <List>
                {comments.map(comment => (
                  <ListItem key={comment._id}>
                    <Comment
                      id={comment._id}
                      user={comment.user}
                      text={comment.text}
                      time={comment.time}
                      maker={props.maker} makerID={props.makerID}
                      joiner={props.joiner} joinerID={props.joinerID}
                      deleteComment={deleteComment}
                      editComment={editComment} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Comments Yet</h3>
            )}
          </div>
          <div className="form">
            <form>
              <TextField
                name="text"
                id="text"
                onChange={handleInputChange}
                label="Comment"
                variant="outlined"
                fullWidth />
              <Button
                id="submit-btn"
                className="comment-btn"
                data-user={userID}
                variant="contained"
                disabled={!(formObject.text)}
                onClick={handleFormSubmit}
                color="primary">
                Say it at {props.currentTime}!
              </Button>
            </form>
          </div>
        </Grid> 
      </Grid>
    </Container>
  );
}

export default Text;
