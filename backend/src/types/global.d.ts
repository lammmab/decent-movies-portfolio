import { Config } from '../constants';

declare global {
  var CONFIG: Config;
  var DEBUG_ENABLED: boolean;
  var JWT_SECRET: any;
  var debug: (message: string, ...args: any[]) => void;
  var info: (message: string, ...args: any[]) => void;
  var warn: (message: string, ...args: any[]) => void;
  var error: (message: string, ...args: any[]) => void;
}

export {};
