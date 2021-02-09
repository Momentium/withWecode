import { Pagination } from "@material-ui/lab";
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

const PaginationCmp = ({
  onChange,
  page,
  itemsPerPage,
  totalLength,
  currPage,
}: any) => {
  const classes = useStyles();
  const noOfPages = Math.ceil(totalLength / itemsPerPage);

  return (
    <>
      {(currPage === "partner" && totalLength > 12) ||
      (currPage === "startup" && totalLength > 16) ||
      (currPage === "reqList" && totalLength > 10) ? (
        <Box className="pagenation-span" component="span">
          <Pagination
            className="pagenation-comp"
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
      ) : null}
    </>
  );
};

export default PaginationCmp;
