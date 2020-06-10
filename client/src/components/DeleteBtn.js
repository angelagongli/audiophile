import React from "react";
import { Button, Icon } from '@material-ui/core';

function DeleteBtn(props) {
  return (
    <Button variant="contained" color="secondary" {...props} >
      <Icon className="fas fa-times" />
    </Button>
  );
}

export default DeleteBtn;
