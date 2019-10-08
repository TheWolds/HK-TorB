# Tor Browser Button add-on files (Windows) by HOAKHUYA
- Original: https://github.com/jeremy-jr-benthum/tor-button/releases 
## Changes & Update (Best configuration for performance)
- tor 0.4.1.5 (2019-10-08)
- geoip (2019-10-08)
- geoip6
- torrc
## Usage:
- Download all files, create new folder `C:\win` and copy all file to this directory
- Run `TOR Launcher.exe` (hidden launcher) - Virustotal : 3/70
- OR `run.bat` for GUI launcher
### Using Hidden Launcher: 
- Re-launch (`TOR Launcher.exe`) to change tor identity
- Using task manager to kill `tor.exe` and `node.exe` for exit tor.
### Using GUI Launcher:
- Open `run.js` , edit last line of this files form `config.start();`  to `config.info();`
- Run `run.cmd` or `run.bat` if cmd file not working normally.
### Test worked on chrome with extensions: https://mybrowseraddon.com/browse-in-tor.html

