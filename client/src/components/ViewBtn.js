import React from "react";
import { Button } from '@material-ui/core';

function ViewBtn(props) {
  return (
    <Button variant="contained" href={"https://www.youtube.com/watch?v=" + props.videoID} target="_blank" rel="noreferrer">
      Play Track on YouTube
    </Button>
  );
}

export default ViewBtn;
