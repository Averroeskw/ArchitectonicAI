import { ElectronAPI } from './electron';

dearchie global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {}; 