param($Port = 3000)

Add-Type -path '.\SharpOSC.dll'
$osc = New-Object SharpOSC.UDPSender "127.0.0.1", 8000

$labels = '["Play","Stop","","Zoom+","Zoom-","","","",""]'
$message0 = New-Object SharpOSC.OscMessage '/play', 1
$message1 = New-Object SharpOSC.OscMessage '/stop', 1
$message2 = ""
$message3 = New-Object SharpOSC.OscMessage '/zoom/y', 1
$message4 = New-Object SharpOSC.OscMessage '/zoom/y', (-1)
$message5 = ""
$message6 = ""
$message7 = ""
$message8 = ""

$IndexPage = 'index.html'
$urlRoot = "http://localhost:$Port/"
$parentPath = $pwd

$listener = New-Object Net.HttpListener
$listener.Prefixes.add($urlRoot)

try{
  "start server... "|oh
  $urlRoot |oh
  try {
    $listener.Start()
  } finally {
    start ($urlRoot + $IndexPage)
  }

  while ($true){
    $ctx = $listener.GetContext()
    if (-not $ctx.Request.isLocal) {
      continue
    }

    $req = $ctx.Request
    $res = $ctx.Response

    ($url = $req.RawUrl)|oh
    $path = $url.TrimStart('/').split("?")[0]
    if (!$path) {
      $path = $IndexPage
    }

    $fullPath = [IO.Path]::Combine($parentPath, $path)
    $content = [byte[]]@()
    switch ($path) {
      'button/0' { $osc.Send($message0) }
      'button/1' { $osc.Send($message1) }
      'button/3' { $osc.Send($message3) }
      'button/4' { $osc.Send($message4) }
      'getlabels'{ $content = [System.Text.Encoding]::UTF8.GetBytes($labels) }
      Default {
        if ([IO.File]::Exists($fullPath)) {
          $content = [IO.File]::ReadAllBytes($fullPath)
        } else {
          $res.StatusCode = 404
        }
      }
    }

    $res.OutputStream.Write($content, 0, $content.Length)
    $res.Close()
  }
} finally {
  $listener.Dispose()
}
pause
