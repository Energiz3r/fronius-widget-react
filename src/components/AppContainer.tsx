import { useState } from "react";
import { styles } from "./AppContainer.css";
import { FroniusWidget } from "./FroniusWidget";

const gaugeWidth = "27vmin";
const froniusWidth = "94vmin";

export const AppContainer = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={styles.app}>
      <FroniusWidget
        gaugeWidth={gaugeWidth}
        width={froniusWidth}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
};
