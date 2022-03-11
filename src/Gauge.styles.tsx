import { makeStyles } from "@mui/styles";

interface Props {
  gaugeColor: { r: number; g: number; b: number };
  darkMode: boolean;
  bgColor: string;
  width: string;
  hasSecondary: boolean;
}

export const useStyles = makeStyles({
  parent: ({ hasSecondary }: Props) => ({
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    "& > div": {
      position: "absolute",
    },
    "& *": {
      cursor: hasSecondary ? "pointer" : "",
    },
  }),
  outer: ({
    bgColor,
    gaugeColor: { r, g, b },
    width,
    hasSecondary,
  }: Props) => ({
    width: "100%",
    height: "100%",
    backgroundColor: bgColor,
    borderRadius: "50%",
    boxSizing: "border-box",
    border: `calc(${width}/300) solid rgba(${r}, ${g}, ${b}, 0.8)`,
    boxShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    "@media (min-width:600px)": {
      //border: `3px solid rgba(${r}, ${g}, ${b}, 0.8)`,
      boxShadow: "1px 1px 5px rgba(0,0,0,0.5)",
    },
  }),
  inner: {
    height: "66%",
    width: "66%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    borderRadius: "50%",
  },
  innerMain: ({ bgColor, gaugeColor: { r, g, b }, width }: Props) => ({
    backgroundColor: bgColor, // <======
    border: `calc(${width}/300) solid rgba(${r}, ${g}, ${b}, 0.8)`,
    zIndex: 5,
  }),
  innerBuffer: ({ bgColor, width }: Props) => ({
    border: `calc(${width}/150) solid ${bgColor}`,
    zIndex: 4,
  }),
  svgContainer: {
    height: "100%",
    width: "100%",
  },
  svgIcon: {
    display: "flex",
    justifyContent: "center",
    "& > img": {
      width: "40%",
      left: "auto",
      right: "auto",
      zIndex: 6,
      "@media (max-width:600px)": {
        filter: "drop-shadow( 1px 1px 1px rgba(0, 0, 0, .5))",
      },
      "@media (min-width:600px)": {
        filter: "drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))",
      },
    },
  },
  pathInvis: {
    fill: "transparent", // <=====
  },
  svgRadials: {
    zIndex: 3,
  },
  pathRadials: ({ bgColor }) => ({
    stroke: bgColor, // <=====
    strokeWidth: "5px",
  }),
  pathFaint: ({ darkMode, gaugeColor: { r, g, b } }: Props) => ({
    fill: `rgba(${darkMode ? r - 120 : r}, ${darkMode ? g - 120 : g}, ${
      darkMode ? b - 120 : b
    }, ${darkMode ? 1 : 0.3})`,
  }),
  pathSolid: ({ gaugeColor: { r, g, b } }: Props) => ({
    fill: `rgba(${r}, ${g}, ${b}, 1)`,
  }),
  pathText: ({ darkMode }) => ({
    fontSize: "4.5rem",
    transform: "scale(+1,-1)",
    fill: darkMode ? "lightgrey" : "black",
  }),
  iconTextContainer: ({ darkMode }) => ({
    height: "100%",
    width: "100%",
    zIndex: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: darkMode ? "lightgrey" : "black",
    "& > * > *": {
      maxWidth: "calc(95vmin /3)",
      maxHeight: "calc(95vmin /3)",
    },
  }),
});
