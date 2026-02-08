
export enum DownloadStatus {
  MISSING = 'Missing',
  DOWNLOADING = 'Downloading',
  DOWNLOADED = 'Downloaded',
  WANTED = 'Wanted'
}

export enum Platform {
  PS1 = 'PlayStation 1',
  PS2 = 'PlayStation 2',
  PS3 = 'PlayStation 3',
  SWITCH = 'Nintendo Switch',
  WII = 'Nintendo Wii',
  GC = 'GameCube',
  PC = 'PC'
}

export interface Game {
  id: string;
  igdbId: string;
  title: string;
  platform: Platform;
  releaseYear: number;
  description: string;
  coverUrl: string;
  status: DownloadStatus;
  path?: string;
  size?: string;
  addedDate: string;
}

export interface DownloadClient {
  id: string;
  name: string;
  type: 'qBittorrent' | 'Sabnzbd';
  host: string;
  port: number;
  apiKey?: string;
  enabled: boolean;
}

export interface Indexer {
  id: string;
  name: string;
  type: 'Torznab' | 'Newznab' | 'Myrient';
  url: string;
  enabled: boolean;
}

export interface PathMapping {
  platform: Platform;
  basePath: string;
}
