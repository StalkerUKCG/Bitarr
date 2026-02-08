# 🎮 Bitarr

Bitarr is a comprehensive game management and automation tool inspired by the 'arr' family (Sonarr/Radarr). It simplifies the process of managing large game libraries across multiple platforms, from PC to retro consoles.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2.4--stable-emerald)
![Docker](https://img.shields.io/badge/docker-ready-indigo)

## ✨ Features

- **Multi-Platform Support**: Per-platform and per-game path mapping for PS1, PS2, PS3, Switch, Wii, GameCube, and PC.
- **Metadata Scraping**: Direct integration with **IGDB** for high-quality covers, descriptions, and ratings.
- **Library Scanning**: Import existing local libraries with automated filename matching.
- **Indexer Integration**: Support for **Myrient** (ROMs), **Prowlarr** (Torznab), and **NZBGeek** (Newznab).
- **Download Automation**: Native support for **qBittorrent** and **SABnzbd**.
- **Modern UI**: Clean, responsive dashboard with real-time download tracking and library statistics.

## 🚀 Deployment

Bitarr is designed to be hosted in a Docker container.

### Using Portainer (Recommended)

1. Open **Portainer** and go to **Stacks** > **Add stack**.
2. Name it `bitarr`.
3. Paste the following YAML into the Web editor:

```yaml
version: '3.8'

services:
  bitarr:
    image: ghcr.io/yourusername/bitarr:latest
    container_name: bitarr
    ports:
      - "5054:80"
    volumes:
      - /path/to/your/games:/mnt/games
      - bitarr_config:/config
    restart: unless-stopped

volumes:
  bitarr_config:
```

## ⚙️ Configuration

1. **Metadata**: Go to Settings > Metadata and enter your Twitch Client ID and Secret (from [dev.twitch.tv](https://dev.twitch.tv)).
2. **Paths**: Go to Settings > Paths to map your mount points to specific console categories.
3. **Downloaders**: Add your qBittorrent or SABnzbd credentials to enable automated fetching.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **Build Tool**: Vite
- **Metadata**: IGDB API (via Twitch OAuth)
- **Server**: Nginx (Alpine)

---
*Disclaimer: Bitarr is a library management tool. Please ensure you own the content you are managing.*