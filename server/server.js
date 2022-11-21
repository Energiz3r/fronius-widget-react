import path from "path";
import express from "express";
import fetch from "node-fetch";
import { dirname } from "path";
import { fileURLToPath } from "url";

const APIurl = "http://192.168.1.3/solar_api/v1/GetPowerFlowRealtimeData.fcgi";
const webPort = 4000;

if (process.env.NODE_ENV)
  console.log("NODE_ENV was defined, it was:", process.env.NODE_ENV);
if (process.env.PORT)
  console.log("PORT was defined, it was:", process.env.PORT);

const dev = process.env.NODE_ENV === "development";
const port = process.env.PORT || webPort;
const subDir = "/../dist";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, subDir);

app.use(express.static(publicPath));
app.get("", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.get("/api", async (req, res) => {
  const response = await fetch(APIurl);
  const responseResolved = await response.json();
  res.send(responseResolved);
});
app.listen(port, () => console.log(`PORT: ${port}`));
console.log("Public root:", publicPath);
console.log("NODE_ENV:", process.env.NODE_ENV, "using dev:", dev);
