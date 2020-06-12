import React from "react";
import ViewBtn from "./ViewBtn";
import SaveBtn from "./SaveBtn";
import Dialog from "./Dialog";
import DeleteBtn from "./DeleteBtn";
import { Grid, Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';

function Track(props) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={2}>
        <img src={props.image} alt={props.title} className="track" />
      </Grid>
      <Grid item sm={10}>
        <Card className="card">
          <CardActionArea>
            <h1>
              {props.title} by {props.channel}
            </h1>
            <CardContent>
              <p>
                {props.description}
              </p>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ViewBtn videoID={props.videoID} />
            {props.type === "searchResult" ?
            <SaveBtn onClick={() => props.saveTrack(props)} user={props.user} title={props.title} /> : 
            <span className="button-span">
              <Dialog {...props} />
              <DeleteBtn onClick={() => props.deleteTrack(props.id)} />
            </span>}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Track;
