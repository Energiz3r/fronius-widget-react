import path from "path";
import express from "express";
import fetch from "node-fetch";
import { dirname } from "path";
import { fileURLToPath } from "url";

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "/build");
const port = process.env.PORT || 4000;
const APIurl = dev
  ? "http://home.noobs.wtf:5000/api"
  : "http://192.168.1.3/solar_api/v1/GetPowerFlowRealtimeData.fcgi";

app.use(express.static(publicPath));
app.get("", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.get("/api", async (req, res) => {
  const response = await fetch(APIurl);
  const responseResolved = await response.json();
  res.send(responseResolved);
});
app.listen(port, () => console.log(`App listening at port: ${port}`));
console.log("Environment is: ", process.env.NODE_ENV);
