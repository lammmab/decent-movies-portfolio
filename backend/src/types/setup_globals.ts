import { config } from "./config";

export function setup() {
    global.CONFIG = config;
    global.DEBUG_ENABLED = config.debug ?? false;

    global.debug = (message: string, ...args: any[]) => {
    if (global.DEBUG_ENABLED) console.debug('[DEBUG]', message, ...args);
    };
    global.info = (message: string, ...args: any[]) => console.info('[INFO]', message, ...args);
    global.warn = (message: string, ...args: any[]) => console.warn('[WARN]', message, ...args);
    global.error = (message: string, ...args: any[]) => console.error('[ERROR]', message, ...args);
}
