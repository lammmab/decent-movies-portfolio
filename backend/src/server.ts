import { setup } from "./types/setup_globals";
setup();

import { PluginManager } from "./plugin/manager";
import router from "./server/app";

const Manager = new PluginManager();

async function main() {
    await Manager.start_manager();
    await Manager.toggle_plugin(Manager.plugins[0]);

    router.go();
}

main();