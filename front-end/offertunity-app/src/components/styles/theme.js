import styled, { css } from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const ConWidth = css`
  width: 80rem;
  margin: 0 auto;
`;

const Title = css`
  font-size: 1.68rem;
`;

const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(26.88),
};

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
  xxxxl: calcRem(30),
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
};
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  transitions: {
    // So we have 'transition: none;' everywhere
    create: () => "none",
  },
  fontSizes,
  colors,
  paddings,
  margins,
  ConWidth,
  Title,
});

export default theme;
