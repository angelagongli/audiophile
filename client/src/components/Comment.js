import React, { useState, useContext } from "react";
import OpenEditBtn from "./OpenEditBtn";
import EditBtn from "./EditBtn";
import BackBtn from "./BackBtn";
import DeleteBtn from "./DeleteBtn";
import UserContext from "../utils/userContext";
import { Grid, Card, CardActionArea, CardActions, CardContent, TextField } from '@material-ui/core';

function CommentBox(props) {
  const [formObject, setFormObject] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    props.editComment(props.id, { text : formObject.edit });
    props.onFinish();
  };

  return (
    <div className="comment-box">
      <div className="form">
        <form>
          <TextField
            name="edit"
            id="edit"
            onChange={handleInputChange}
            label="Edit this comment"
            variant="outlined"
            defaultValue={props.text}
            fullWidth />
          <span className="button-span">
            <EditBtn disabled={!(formObject.edit)} onClick={handleFormSubmit} />
            <BackBtn onClick={props.onFinish} />
          </span>
        </form>
      </div>
    </div>
  );
}

function Comment(props) {  
  const [inEdit, setInEdit] = useState(false);
  const { username, userID } = useContext(UserContext);  
  
  const handleEditStart = () => {
    setInEdit(true);
  }

  const handleEditFinish = () => {
    setInEdit(false);
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={10}>
        <Card className="card" style={props.user === userID ?
          {backgroundColor: "lightskyblue"} : {backgroundColor: "lightpink"}}>
          <CardActionArea>
            <h1>
              {props.user === props.makerID ? props.maker : props.joiner } @ {props.time}
            </h1>
            <CardContent>
              {inEdit ? <CommentBox onFinish={handleEditFinish} {...props} /> : 
              <p>{props.text}</p>}
            </CardContent>
          </CardActionArea>
          {props.user === userID ? 
          <CardActions>
            <OpenEditBtn onClick={handleEditStart} />
            <DeleteBtn onClick={() => props.deleteComment(props.id)} />
          </CardActions> : ""}
        </Card>
      </Grid>
    </Grid>
  );
}

export default Comment;
