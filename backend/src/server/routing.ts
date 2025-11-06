import {Request,Response,Express} from 'express';
import fs from "fs";
import path from "path";

/* 
FolderRouter-
Maps a folder of Route (check ./routes) exports to api endpoints

constructor(folder_name: string, app: Express)

1. initializes class variables
2. sets up routes using the specific folder name
3. sets up the app to use each api route

*/
export class FolderRouter {
    folder_name: string;
    path: string;
    
    app: Express;
    routes: Route[] = [];
    constructor(folder_name: string, app: Express) {
        this.folder_name = folder_name;
        this.path = path.join(__dirname,this.folder_name)
        this.app = app;
        if (!fs.existsSync(this.path)) { throw new Error(`Routing path ${this.path} not found`) }
        this.routes = this.setupRoutes();

        this.routes.forEach(route => {
            info(`Routing /api/${route.name}`)
            this.app.use(`/api/${route.name}`, route.resource);
        });
    }

    setupRoutes(): Route[] {
        let routes: Route[] = []
        fs.readdirSync(this.path).forEach((file) => {
            if (!file.endsWith('.ts') && !file.endsWith('.js')) { warn(`File ${file} in routes folder doesn't end with proper extension`); return; }

            const modulePath = path.join(this.path, file);
            try {
                const mod = require(modulePath);
                Object.values(mod).forEach(exported => {
                    if (exported instanceof Route) routes.push(exported);
                });
            } catch (err) {
                error(`Failed to load route file ${file}:`, err);
            }
        });
        return routes
    }

    go() {
        this.app.listen(CONFIG.port, () => {
            info(`Server running on port ${CONFIG.port}`);
        });
    }
}

export class Route {
    name: string;
    resource: (req: Request,res: Response) => void;

    constructor(name: string, resource: (req: Request, res: Response) => void) {
        this.name = name
        this.resource = resource
    }

    call(req: Request, res: Response) {
        this.resource(req,res)
    }
}