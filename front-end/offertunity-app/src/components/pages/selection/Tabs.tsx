import React from "react";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const CATEGORY_ARR = [
  "플랫폼",
  "마감임박",
  "IR자료 업로드",
  "예비창업자",
  "개발자구함",
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(event.target);
    setValue(newValue);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
        centered
      >
        {CATEGORY_ARR.map((category: string, idx: number) => {
          return <Tab label={category} key={idx} />;
        })}
      </Tabs>
    </Paper>
  );
}
