CortexDB Uniplex Login screen
=============================

Die einfache Gestaltung der Login-Seite des Uniplex ist möglich, und wird als ein Plugin umgesetzt, das per `Remote-Admin` in die Datenbank integriert werden muss. Zur Definition des Plugins wird eine ini Datei benötigt (`config.ini`) und die eigentliche Start-Seite mit dem Namen `start.php`.

config.ini
----------

```
[global]
Name=UniPlex/start/myLoginScreen
Version=1.0.001
```

start.php
---------

Die Datei `start.php` ist in diesem Beispiel abgelegt. Diese wird in einem `iframe` geladen und angezeigt. Die im html-header genutzten Scripte sollten daher nicht verändert werden, da ein Login ansonsten nicht sichergestellt werden kann.

Der Html-Body der `start.php` kann beliebig angepasst werden, um ein eigenes Logo oder andere Funktionen auf der Startseite anzuzeigen.

Konfiguration des HTTP-Server
-----------------------------

Damit die Startseite das eigene Logo anzeigen kann, muss der Webserver das entsprechende Plugin heranziehen. Da der Uniplex zu diesem Zeitpunkt noch nicht geladen ist, muss der Webserver die Konfiguration an anderer Stelle auslesen.  

Im ini-Block `[HTTPSRV]` der `ctxserver.ini` oder je virtual host in der `ctxhttpd.ini` muss daher folgender Eintrag aufgenommen werden:

```
SERVERVAR_UniplexStart=myLoginScreen
```

Der Name ist der Name des Plugins (ohne Pfad-Angabe), wie dieser in der `config.ini` festgelegt wurde.

