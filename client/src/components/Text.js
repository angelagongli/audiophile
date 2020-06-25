import React, { useState, useEffect, useContext, useRef } from "react";
import Comment from "./Comment";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import { Container, Grid, Button, TextField, List, ListItem } from '@material-ui/core';

function Text(props) {
  const [comments, setComments] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [newComment, setNewComment] = useState();
  const ref = useRef(null);
  
  useEffect(() => {
    loadComments();
  }, [comments]);

  const { username, userID } = useContext(UserContext);
  const playback = props.playback;

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
            time: playback.currentTime,
            conversation: props.id
        })
        .then(res => {
          setNewComment(res.data._id);
          loadComments();
          setTimeout(() => {
            ref.current.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, 1000);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item sm={12}>
          <h2>
            Join the Conversation
          </h2>
          <div id="comment-info">
            {props.commentInfo.user && props.commentInfo.user !== userID ? 
            <p className="comment">
              {(props.commentInfo.user === props.makerID ? props.maker : props.joiner) + 
              " commented at " + props.commentInfo.time + "!"}
            </p>
            : ""}
          </div>
          <div className="comments-container">
            {comments.length ? (
              <List>
                {comments.map(comment => (
                  <ListItem key={comment._id}>
                    {comment._id === newComment ?
                    <span ref={ref}></span> : ""} 
                    <Comment
                      id={comment._id}
                      user={comment.user}
                      text={comment.text}
                      time={props.prettifyTime(comment.time)}
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
                user={userID}
                conversation={props.id}
                time={props.prettifyTime(playback.currentTime)}
                variant="contained"
                disabled={!(formObject.text)}
                onClick={handleFormSubmit}
                color="primary">
                Say it at {props.prettifyTime(playback.currentTime)}!
              </Button>
            </form>
          </div>
        </Grid> 
      </Grid>
    </Container>
  );
}

export default Text;
