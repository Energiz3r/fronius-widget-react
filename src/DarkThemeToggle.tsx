import { ReactComponent as MoonIcon } from "./svg/moon.svg";
import { ReactComponent as SunIcon } from "./svg/sun.svg";
import { useStyles } from "./DarkThemeToggle.styles";

interface Props {
  darkMode: boolean;
  setDarkMode: any;
  buttonWidth: string;
}

const DarkThemeToggle = ({ darkMode, setDarkMode, buttonWidth }: Props) => {
  const classes = useStyles({ darkMode, buttonWidth });

  return (
    <div className={classes.main}>
      <div className={classes.outer} onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <MoonIcon /> : <SunIcon />}
        <div className={classes.slider}></div>
      </div>
    </div>
  );
};

export default DarkThemeToggle;
