import type {Config} from "../constants";

function get_config() {
    const fs = require('fs');
    const path = require('path');
    
    const confData = fs.readFileSync(path.resolve(__dirname, '../../config.json'), 'utf-8');
    return JSON.parse(confData) as Config;
}

let config: Config = get_config();

export { config }