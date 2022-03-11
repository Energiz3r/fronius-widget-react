import { makeStyles } from "@mui/styles";

interface Props {
  darkMode: boolean;
  buttonWidth: string;
}

const switchSpacing = 0.1;
const light = "rgb(255,255,255)";
const dark = "rgb(20,20,20)";
const length = 4;

export const useStyles = makeStyles({
  main: ({ buttonWidth }: Props) => ({
    position: "absolute",
    top: `calc(${buttonWidth}/14)`,
    left: `calc(${buttonWidth}/14)`,
    width: buttonWidth,
    height: `calc(${buttonWidth} /2)`,
  }),
  outer: ({ darkMode, buttonWidth }: Props) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: darkMode ? light : dark,
    borderRadius: `calc(${buttonWidth}/4)`,
    cursor: "pointer",
    "& > svg": {
      position: "absolute",
      fill: darkMode ? dark : light,
      width: `calc(${buttonWidth}/ 2 - ${buttonWidth} * ${switchSpacing})`,
      top: `calc((${buttonWidth} * ${switchSpacing}) / 2)`,
      left: darkMode
        ? `calc((${buttonWidth} * ${switchSpacing}))`
        : `calc(${buttonWidth} - ((${buttonWidth} * ${switchSpacing}) ) - (${buttonWidth}/ 2 - (${buttonWidth} * ${switchSpacing})))`,
    },
  }),
  slider: ({ darkMode, buttonWidth }: Props) => ({
    position: "relative",
    backgroundColor: darkMode ? dark : light,
    height: `calc(${buttonWidth}/ 2 - ${buttonWidth} * ${switchSpacing})`,
    width: `calc(${buttonWidth}/ 2 - ${buttonWidth} * ${switchSpacing})`,
    top: `calc((${buttonWidth} * ${switchSpacing}) / 2)`,
    left: !darkMode
      ? `calc((${buttonWidth} * ${switchSpacing}) / 2)`
      : `calc(${buttonWidth} - ((${buttonWidth} * ${switchSpacing}) / 2 ) - (${buttonWidth}/ 2 - (${buttonWidth} * ${switchSpacing})))`,
    borderRadius: length / 2 - switchSpacing + "rem",
  }),
});
