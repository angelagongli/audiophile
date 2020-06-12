import React from "react";
import { Button } from '@material-ui/core';

function BackBtn(props) {
  return (
    <Button className="back-btn" variant="contained" color="secondary" {...props} >
      Go Back
    </Button>
  );
}

export default BackBtn;
