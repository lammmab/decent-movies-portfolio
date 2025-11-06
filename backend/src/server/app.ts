import { FolderRouter } from "./routing";

import {errorHandler} from "../middleware/errorHandler";
import express,{Express} from 'express';

const app: Express = express();
app.use(express.json());

info("Setting up FolderRouter")
const router = new FolderRouter("../routes",app);

app.use(errorHandler);

export default router