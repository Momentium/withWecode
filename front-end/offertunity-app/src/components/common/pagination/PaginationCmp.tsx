import React, { useState } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#898989",
    },
    "& .Mui-selected": {
      color: "black",
      background: "white",
      textDecoration: "underline",
    },
    "& : hover": {
      backgroundColor: "white",
    },
  },
}));

const PaginationCmp = ({ onChange, listLength, page, itemsPerPage }: any) => {
  const classes = useStyles();
  const noOfPages = Math.ceil(listLength / itemsPerPage);

  return (
    <Box component="span">
      <Pagination
        count={noOfPages}
        page={page}
        onChange={onChange}
        defaultPage={1}
        size="large"
        showFirstButton
        showLastButton
        classes={{ ul: classes.ul }}
      />
    </Box>
  );
};

export default PaginationCmp;
