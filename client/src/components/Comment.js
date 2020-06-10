import React, { useContext } from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import UserContext from "../utils/userContext";
import { Grid, Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';

function Comment(props) {  
  const { username, userID } = useContext(UserContext);  
  
  return (
    <Grid container spacing={2}>
      <Grid item sm={10}>
        <Card className="card" style={props.user === userID ? {backgroundColor : "lightskyblue"} : {backgroundColor : "lightpink"}}>
          <CardActionArea>
            <h1>
              {props.user === props.makerID ? props.maker : props.joiner } @ {Math.floor(props.time / 60) + ":" + 
              (Math.floor(props.time % 60) < 10 ? "0" : "") + Math.floor(props.time % 60)}
            </h1>
            <CardContent>
              <p>
                {props.text}
              </p>
            </CardContent>
          </CardActionArea>
          {props.user === userID ? 
          <CardActions>
            <EditBtn onClick={() => props.editComment(props.id, { text : "updated text" })} />
            <DeleteBtn onClick={() => props.deleteComment(props.id)} />
          </CardActions> : ""}
        </Card>
      </Grid>
    </Grid>
  );
}

export default Comment;
