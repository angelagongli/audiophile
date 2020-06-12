import React from "react";
import { Button, Icon } from '@material-ui/core';

function OpenEditBtn(props) {
  return (
    <Button variant="contained" color="primary" {...props} >
      <Icon className="fas fa-edit" />
    </Button>
  );
}

export default OpenEditBtn;
