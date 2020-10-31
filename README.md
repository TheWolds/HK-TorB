# Tor Browser Button add-on files (Windows) by HOAKHUYA
- Original: https://github.com/jeremy-jr-benthum/tor-button/releases 
## Changes & Update (Best configuration for performance)
- tor 0.4.4.5 (2020-31-10)

## old changes
- tor 0.4.3.6 (2020-07-09)
- fixed all issue related to `geoip`, `run.js` , support vietnamese language at `run_vie.bat` & `run_vie.cmd`
- Please extract all files, `tor.exe` must available at `C:\TOR\tor.exe` after extract.
- tor 0.4.3.5 (2020-06-13)
- geoip - lasest
- geoip6 - lasest
- torrc - lasest
## Usage:
- Download all files, create new folder `C:\TOR` and extract all file to this directory
- Download extension for chrome : https://chrome.google.com/webstore/detail/browse-with-onion/hfddekpiekhlkkgeaobcdkeonpkinipo
- Open that extension , modified textarea to `*.torproject.org*,*.ipleak.net*,*.onion*,*bbs.hoakhuya.com*` then close that modal.
- Run `TOR Launcher.exe` x64 (hidden launcher) - Virustotal : 3/70
- OR `run.bat` for GUI launcher , and wait until 100% 
- Final step! back to run extension, click the connect icon to blind TOR to browser..
### Using Hidden Launcher: 
- Re-launch (`TOR Launcher.exe`) to change tor identity
- Using task manager to kill `tor.exe` and `node.exe` for exit tor.
### Using GUI Launcher:
- Open `run.js` , edit last line of this files form `config.start();`  to `config.info();`
- Run `run.cmd` or `run.bat` if cmd file not working normally.
### Test worked on chrome with extensions: https://mybrowseraddon.com/browse-in-tor.html

