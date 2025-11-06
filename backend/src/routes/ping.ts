import {Route} from '../server/routing';
import {Request,Response} from 'express';

function route(req: Request,res: Response) {
    res.json({ message: 'pong' });
}

export let ping: Route = new Route('ping',route)

