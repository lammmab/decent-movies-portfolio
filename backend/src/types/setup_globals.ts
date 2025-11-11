import { config } from "./config";
import { loadEnvFile } from "process";

export function setup() {
    loadEnvFile('./.env');

    global.ROOT_DIR = process.cwd();
    global.CONFIG = config;
    global.DEBUG_ENABLED = config.debug ?? false;

    global.debug = (message: string, ...args: any[]) => {
    if (global.DEBUG_ENABLED) console.debug('[DEBUG]', message, ...args);
    };
    global.info = (message: string, ...args: any[]) => console.info('[INFO]', message, ...args);
    global.warn = (message: string, ...args: any[]) => console.warn('[WARN]', message, ...args);
    global.error = (message: string, ...args: any[]) => console.error('[ERROR]', message, ...args);

    if (!process.env.KEY) {
        throw new Error(".env does not provide secret key. Check README.md")
    }
    global.JWT_SECRET = process.env.KEY;

}
