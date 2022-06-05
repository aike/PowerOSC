PowerOSC
===
PowerOSC is an example program with a Web UI, local web server and OSC message sender written in PowerShell script.

![screenshot](ss.gif)

## OSC message definition

OSC destination and messages are defined in server.ps1 like this:

```PowerShell
$osc = New-Object SharpOSC.UDPSender "127.0.0.1", 8000
$labels = '["Play", "Stop", "Zoom+", "Zoom-", "", "", "", "", ""]'
$message0 = New-Object SharpOSC.OscMessage '/play', 1
$message1 = New-Object SharpOSC.OscMessage '/stop', 1
$message2 = New-Object SharpOSC.OscMessage '/zoom/y', 1
$message3 = New-Object SharpOSC.OscMessage '/zoom/y', (-1)
$message4 = $null
$message5 = $null
```

## Dependent Libraries

PowerOSC uses SharpOSC.dll  
https://github.com/ValdemarOrn/SharpOSC

## Reference

https://qiita.com/kikuchi/items/785631cb24dfe5fa8d52

## Credit

PowerOSC program is licensed under MIT License.  
Copyright 2022, aike (@aike1000)
