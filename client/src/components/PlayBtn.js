import React from "react";
import { Button } from '@material-ui/core';

function PlayBtn(props) {
  return (
    <Button variant="contained" color="primary" href={"/play/" + props.id}>
      Play this Conversation
    </Button>
  );
}

export default PlayBtn;
