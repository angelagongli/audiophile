import React from "react";
import ViewBtn from "./ViewBtn";
import PlayBtn from "./PlayBtn";
import DeleteBtn from "./DeleteBtn";
import { Grid, Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';

function Conversation(props) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={2}>
        <img src={props.track.image} alt={props.track.title} className="track" />
      </Grid>
      <Grid item sm={10}>
        <Card className="card">
          <CardActionArea>
            <h1>
              {props.track.title} by {props.track.channel}
            </h1>
            <h2>
              A conversation between {props.maker.username} and {props.joiner.username}
            </h2>
            <CardContent>
              <p>
                {props.track.description}
              </p>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ViewBtn videoID={props.track.videoID} />
            <PlayBtn id={props.id} />
            <DeleteBtn onClick={() => props.deleteConversation(props.id)} />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Conversation;
