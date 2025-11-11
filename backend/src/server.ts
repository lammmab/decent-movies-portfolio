

import { setup } from "./types/setup_globals";
setup();

import { PluginManager } from "./plugin/manager";
import { AppContext, FolderRouter } from "./server/routing";
import {errorHandler} from "./middleware/error_handler";
import express,{Express} from 'express';

const Manager = new PluginManager();

const app: Express = express();
app.use(express.json());

info("Setting up FolderRouter")

const ctx: AppContext = { manager: Manager };
const router = new FolderRouter("../routes", app, ctx);

app.use(errorHandler);


async function main() {
    await Manager.start_manager();
    router.go();
}

main();