import React from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  styled,
} from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
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

const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        marginBottom: "0.625rem",
      },
      centered: {
        justifyContent: "flex-start",
      },
      indicator: {
        backgroundColor: "orange",
      },
    },
  },
});

export default function CenteredTabs({ handleClickTab }: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
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
          return (
            <Tab
              disableRipple
              label={category}
              key={idx}
              onClick={(event) => handleClickTab(event)}
            />
          );
        })}
      </Tabs>
    </MuiThemeProvider>
  );
}
