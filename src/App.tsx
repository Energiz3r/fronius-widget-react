import { useState } from "react";
import { useStyles } from "./App.styles";
import FroniusWidget from "./FroniusWidget";

const froniusWidth = "94vmin";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles({ froniusWidth: froniusWidth });
  return (
    <div className={classes.app}>
      <FroniusWidget
        width={froniusWidth}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default App;
