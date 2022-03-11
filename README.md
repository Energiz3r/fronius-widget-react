# fronius-widget-react

Built from scratch in react (with the exception of icons stolen from the FroniusWeb site), froinus-widget-react is a clone of the 'Current Power' widget from Fronius web, however it displays full screen, connects to your inverter's API directly, responds instantly to changes in usage and production, and can be embedded in other react projects with ease.

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

## server config

### pm2

`pm2 start npmx --name "Fronius" -- supervisor server.js`

### git-auto-pull

`pm2 start /home/tangles/Repos/git-auto-pull/node_modules/git-auto-pull/git-auto-pull.js --name "GitAutoPull" -- /home/tangles/Repos/fronius-widget-react/`
