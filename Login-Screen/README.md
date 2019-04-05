CortexDB Uniplex Login screen
=============================

The simple design of the Uniplex login page is possible, and is implemented as a plugin, which must be integrated into the database via `Remote-Admin`. To define the plugin you need an ini file (`config.ini`) and the start page with the name `start.php`.

config.ini
----------

```
[global]
Name=UniPlex/start/myLoginScreen
Version=1.0.001
```

start.php
---------

The file `start.php` is stored in this example. It is loaded and displayed in an `iframe`. The scripts used in the html-header should therefore not be changed, otherwise a login cannot be guaranteed.

The html-body of the `start.php` can be modified to display your own logo or other functions on the start page.

Configuration of the HTTP-Server
--------------------------------

To enable the start page to display your own logo, the web server must use the correct plugin. Since the Uniplex is not loaded at this time, the web server has to read the configuration at a different place.  

In the ini block `[HTTPSRV]` the `ctxserver.ini` or per virtual host in the `ctxhttpd.ini` the following entry has to be added:

```
SERVERVAR_UniplexStart=myLoginScreen
```

The name is the name of the plugin (without path) as specified in `config.ini`.

