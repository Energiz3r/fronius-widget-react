import { useEffect, useState } from "react";
import { useStyles } from "./FroniusWidget.styles";
import Gauge from "./Gauge";
import SVGBattery from "./svg/battery.svg";
import SVGConsumption from "./svg/consumption.svg";
import SVGPV from "./svg/pv.svg";
import SVGGrid from "./svg/grid.svg";
import SVGInverter from "./svg/inverter.svg";
import SVGInverterDark from "./svg/inverter-dark.svg";
import { fetchFlowData, refreshSpeed } from "./utils/fetch-solar";
import { findPoint } from "./utils/geometry";
import DarkThemeToggle from "./DarkThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faGear } from "@fortawesome/free-solid-svg-icons";

const colorToString = ({ r, g, b }: any) => {
  return `rgb(${r},${g},${b})`;
};

const froniusColors = {
  orange: { r: 247, g: 192, b: 2 },
  blue: { r: 112, g: 175, b: 205 },
  green: { r: 103, g: 215, b: 103 },
  red: { r: 255, g: 80, b: 80 },
  grey: { r: 204, g: 204, b: 204 },
};

const clamp = (number: number, min: number = 0, max: number = 100) => {
  return Math.max(min, Math.min(number, max));
};

// generate series of SVG paths in chevron shapes
const generateChevrons = (
  cl: any,
  outward: boolean,
  xdir: boolean,
  ydir: boolean,
  col: string
) => {
  const drawBoxWidth = 500;
  const distFromCentre = 60;
  const numChevrons = 4;
  const distBetween = 14;
  const size = 15;
  const offset = outward ? distFromCentre + 5 : distFromCentre;
  const tailoffset = outward ? -size : size;
  return [...Array(numChevrons)].map((x, i) => {
    const coord = i * distBetween;
    const xloc = xdir
      ? drawBoxWidth / 2 + offset + coord
      : drawBoxWidth / 2 - offset - coord;
    const yloc = ydir
      ? drawBoxWidth / 2 + offset + coord
      : drawBoxWidth / 2 - offset - coord;
    const tailx = xdir ? xloc + tailoffset : xloc - tailoffset;
    const taily = ydir ? yloc + tailoffset : yloc - tailoffset;
    return (
      <path
        key={`${i}a`}
        className={cl}
        style={{ stroke: col, fill: "transparent" }}
        d={`M ${xloc} ${taily} L ${xloc} ${yloc} L ${tailx} ${yloc}`}
      />
    );
  });
};

interface Props {
  width: string;
  darkMode: boolean;
  setDarkMode: any;
}

const FroniusWidget = ({
  width,
  darkMode,
  setDarkMode,
}: Props): JSX.Element => {
  const [currentPower, setCurrentPower] = useState(0);
  const [currentGrid, setCurrentGrid] = useState(0);
  const [currentLoad, setCurrentLoad] = useState(0);
  const [currentBattery, setCurrentBattery] = useState(0);
  const [hasBattery, setHasBattery] = useState(false);
  const [currentSC, setCurrentSC] = useState(0);
  const [currentAutonomy, setCurrentAutonomy] = useState(0);
  const [APIFetching, setAPIFetching] = useState(false);

  const classes = useStyles({ darkMode, width });

  const pvMax = 5500;
  const gridMax = 5500;
  const consumptionMax = 5500;

  const formatPower = (power: number) => {
    return power > 1000
      ? `${Math.round((power / 1000) * 100) / 100} kW`
      : `${Math.round(power)} W`;
  };

  const currentPowerText = formatPower(currentPower);
  const currentLoadText = formatPower(Math.abs(currentLoad));
  const currentGridText = formatPower(Math.abs(currentGrid));
  const currentBatteryText = `${Math.round(currentBattery)}%`;
  const currentSCText = `${Math.round(currentSC)}%`;
  const currentAutonomyText = `${Math.round(currentAutonomy)}%`;

  const fetchData = async () => {
    if (APIFetching) return;
    setAPIFetching(true);
    const result = await fetchFlowData();
    if (!result.success) {
      console.log("Fetch error:", result.error);
    } else {
      setCurrentPower(result.currentPower);
      setCurrentGrid(result.currentGrid);
      setCurrentLoad(result.currentLoad);
      setCurrentBattery(result.currentBattery);
      setHasBattery(result.hasBattery || false);
      setCurrentSC(result.currentSC);
      setCurrentAutonomy(result.currentAutonomy);
    }
    setAPIFetching(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, refreshSpeed);
    return () => clearInterval(interval);
  }, []);

  const lines = [
    { cx: 100, cy: 100, rad: 420, angle: 45 },
    { cx: 100, cy: 400, rad: 420, angle: -45 },
  ];

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div>
          <DarkThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            buttonWidth={`calc(${width} / 13)`}
          />
        </div>
        CURRENT POWER
        <div className={classes.statusIcon}>
          {APIFetching ? (
            <FontAwesomeIcon icon={faGear} spin />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.svgContainer}>
          <svg viewBox="0 0 500 500" className={classes.lines}>
            <path
              className={classes.pathRadials}
              d={`M ${lines[0].cx} ${lines[0].cy} L ${findPoint(lines[0]).x} ${
                findPoint(lines[0]).y
              }`}
            />
            <path
              className={classes.pathRadials}
              d={`M ${lines[1].cx} ${lines[1].cy} L ${findPoint(lines[1]).x} ${
                findPoint(lines[1]).y
              }`}
            />
          </svg>
        </div>
        <div className={classes.svgContainer}>
          <svg
            viewBox="0 0 500 500"
            className={`${classes.lines} ${classes.SVGShadow}`}
          >
            {currentPower !== 0 &&
              generateChevrons(
                classes.pathChevrons,
                currentPower < 0,
                false,
                false,
                colorToString(froniusColors.orange)
              )}
            {currentLoad !== 0 &&
              generateChevrons(
                classes.pathChevrons,
                currentLoad < 0,
                true,
                false,
                colorToString(froniusColors.blue)
              )}
            {currentGrid !== 0 &&
              generateChevrons(
                classes.pathChevrons,
                currentGrid < 0,
                false,
                true,
                colorToString(froniusColors.red)
              )}
          </svg>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Gauge
              color={froniusColors.orange}
              text={currentPowerText}
              icon={SVGPV}
              darkMode={darkMode}
              percent={clamp((100 * Math.abs(currentPower)) / pvMax)}
              width={width}
            />
          </div>
          <div className={classes.col}></div>
          <div className={classes.col}>
            <Gauge
              color={froniusColors.blue}
              text={currentLoadText}
              icon={SVGConsumption}
              darkMode={darkMode}
              percent={clamp((100 * Math.abs(currentLoad)) / consumptionMax)}
              width={width}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}></div>
          <div className={classes.col}>
            <Gauge
              color={froniusColors.grey}
              darkMode={darkMode}
              variant="empty"
              icon={darkMode ? SVGInverterDark : SVGInverter}
              width={width}
            />
          </div>
          <div className={classes.col}></div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Gauge
              color={froniusColors.red}
              text={currentGridText}
              icon={SVGGrid}
              darkMode={darkMode}
              percent={clamp((100 * Math.abs(currentGrid)) / gridMax)}
              width={width}
            />
          </div>
          <div className={classes.col}></div>
          <div className={classes.col}>
            {hasBattery ? (
              <Gauge
                color={froniusColors.green}
                text={currentBatteryText}
                percent={currentBattery}
                icon={SVGBattery}
                variant="battery"
                darkMode={darkMode}
                width={width}
              />
            ) : (
              <Gauge
                color={froniusColors.green}
                text={currentAutonomyText}
                textSecondary={currentSCText}
                percent={currentAutonomy}
                percentSecondary={currentSC}
                darkMode={darkMode}
                variant="noscale"
                iconText={`Self<br>Sufficiency`}
                iconTextSecondary={`Self<br>Consumption`}
                iconTextSize={2.7}
                width={width}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FroniusWidget;
