import React from "react";
import { Button } from '@material-ui/core';

function EditBtn(props) {
  return (
    <Button className="edit-btn" variant="contained" color="primary" {...props} >
      Edit Comment
    </Button>
  );
}

export default EditBtn;
