# Tor Browser Button add-on files (Windows) by HOAKHUYA
- Original: https://github.com/jeremy-jr-benthum/tor-button/releases 
## Changes & Update (Best configuration for performance)
- tor 0.4.1.6 (2019-11-15)
- geoip - lasest
- geoip6 - lasest
- torrc - lasest
## Usage:
- Download all files, create new folder `C:\win` and copy all file to this directory
- Download extension for chrome : https://chrome.google.com/webstore/detail/browse-with-onion/hfddekpiekhlkkgeaobcdkeonpkinipo
- Open that extension , modified textarea to `*.torproject.org*,*.ipleak.net*,*.onion*` then close that modal.
- Run `TOR Launcher.exe` x64 (hidden launcher) - Virustotal : 3/70
- OR `run.bat` for GUI launcher
- Final step! back to extension, click the connect icon.
### Using Hidden Launcher: 
- Re-launch (`TOR Launcher.exe`) to change tor identity
- Using task manager to kill `tor.exe` and `node.exe` for exit tor.
### Using GUI Launcher:
- Open `run.js` , edit last line of this files form `config.start();`  to `config.info();`
- Run `run.cmd` or `run.bat` if cmd file not working normally.
### Test worked on chrome with extensions: https://mybrowseraddon.com/browse-in-tor.html

