import { makeStyles } from "@mui/styles";

interface Props {
  darkMode: boolean;
  width: string;
}

export const useStyles = makeStyles({
  main: ({ darkMode }: Props) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: ["Roboto", "sans-serif"].join(","),
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateRows: "auto",
    gridAutoRows: "1fr",
    justifyContent: "center",
    backgroundColor: darkMode ? "rgb(5,5,5)" : "white",
  }),
  header: ({ darkMode, width }: Props) => ({
    position: "relative",
    paddingTop: `calc(${width}/130)`,
    height: `calc(${width}/27)`,
    backgroundColor: darkMode ? "rgb(15,15,15)" : "white",
    padding: `calc(${width}/150)`,
    textAlign: "center",
    borderBottom: `calc(${width}/400) solid ${
      darkMode ? "rgb(120,120,120)" : "lightgrey"
    }`,
    color: darkMode ? "white" : "grey",
    fontSize: `calc(${width}/30)`,
  }),
  statusIcon: ({ darkMode, width }: Props) => ({
    position: "absolute",
    right: `calc(${width}/130)`,
    top: `calc(${width}/130)`,
    color: darkMode ? "white" : "grey",
  }),
  body: ({ width }: Props) => ({
    width: width,
    height: width,
    display: "grid",
    gridAutoFlow: "row",
    gridAutoColumns: "1fr",
    position: "relative",
    "&>div:nth-child(3)": {
      //backgroundColor: "rgba(80,80,80,0.1)",
    },
    "&>div:nth-child(5)": {
      //backgroundColor: "rgba(80,80,80,0.1)",
    },
  }),
  row: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "1fr",
    "&>*:nth-child(1)": {
      //backgroundColor: "rgba(80,80,80,0.1)",
    },
    "&>*:nth-child(3)": {
      //backgroundColor: "rgba(80,80,80,0.1)",
    },
  },
  col: ({ width }: Props) => ({
    flexGrow: 1,
    padding: `calc(${width}/50)`,
  }),
  svgContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  lines: {
    position: "absolute",
  },
  pathRadials: ({ darkMode }: Props) => ({
    stroke: darkMode ? "rgb(60,60,60)" : "lightgrey",
    strokeWidth: "2px",
  }),
  pathChevrons: {
    strokeWidth: "4px",
  },
  SVGShadow: ({ darkMode }: Props) => ({
    filter: darkMode
      ? "drop-shadow( 1px 1px 4px rgba(0, 0, 0, 1))"
      : "drop-shadow( 1px 1px 2px rgba(0, 0, 0, 0.5))",
  }),
});
