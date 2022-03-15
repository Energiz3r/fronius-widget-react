# fronius-widget-react

![screenshot](https://i.imgur.com/YeVx7GX.png)

Built from scratch in react (with the exception of icons stolen from the FroniusWeb site), froinus-widget-react is a clone of the 'Current Power' widget from Fronius web. This, however, displays full screen / semi-responsively, responds instantly to changes in readings as it connects to your inverter's API directly over LAN or WiFi, and can be embedded in other react projects with ease.

This could be theoretically used with any brand of inverter's API. Editing `/src/utils/fetch-solar.js` to suit should be simple enough.

## Getting Started

- edit `APIurl` and `webPort` in `server.js` as needed to suit your setup
- install NodeJS
- clone the repo
- navigate to `./fronius-widget-react/server`
- run `npm install`
- start server with `node server.js`

## Server Config - Node, Express, and PM2



## API data structure

`http://<inverter IP address>/solar_api/v1/GetPowerFlowRealtimeData.fcgi`

```
{
   "Body" : {
      "Data" : {
         "Inverters" : {
            "1" : {
               "DT" : 76,
               "E_Day" : 309.89999389648438,
               "E_Total" : 15427050,
               "E_Year" : 2087096,
               "P" : 655
            }
         },
         "Site" : {
            "E_Day" : 309.89999389648438,
            "E_Total" : 15427050,
            "E_Year" : 2087096,
            "Meter_Location" : "grid",
            "Mode" : "meter",
            "P_Akku" : null,
            "P_Grid" : -434.49000000000001,
            "P_Load" : -220.50999999999999,
            "P_PV" : 655,
            "rel_Autonomy" : 100,
            "rel_SelfConsumption" : 33.66564885496183
         },
         "Version" : "12"
      }
   },
   "Head" : {
      "RequestArguments" : {},
      "Status" : {
         "Code" : 0,
         "Reason" : "",
         "UserMessage" : ""
      },
      "Timestamp" : "2022-03-11T08:41:26+11:00"
   }
}
```

Fronius inverters expose other API endpoints, however these fetch from flash instead of memory and so are not performant, with page load times in the multiple seconds - see {PDFlink}

### linux server

I used these packages:

[npm - pm2](https://www.npmjs.com/package/pm2) - start server at boot
[npm - supervisor](https://www.npmjs.com/package/supervisor) - to monitor server.js and auto-restart if file is changed
[npm - git-auto-pull](https://www.npmjs.com/package/git-auto-pull) - automatically pull down changes to the git repo, allowing me to update client and server code without having to log onto the server to update and restart it

`pm2 start npx --name "Fronius" -- supervisor /home/tangles/Repos/fronius-widget-react/server/server.js && pm2 save` to start server in service mode
`pm2 start /home/tangles/Repos/git-auto-pull/node_modules/git-auto-pull/git-auto-pull.js --name "GitAutoPull" -- /home/tangles/Repos/fronius-widget-react/ "pm2 restart Fronius --no-color"`
