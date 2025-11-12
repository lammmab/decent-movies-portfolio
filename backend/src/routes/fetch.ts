/*
fetch.ts

The main client access point of the backend

Unpacks parameters passed into /api/fetch
?method=functionName
&args=whatever
*/


import {AppContext, Route} from '../server/routing';
import {Request,Response} from 'express';
import { AUTHROLE } from '../constants';

async function fetch(req: Request,res: Response, ctx?: AppContext) {
    if (!ctx!.manager) {
        return res.status(404).json({ error: 'There is no plugin manager in the app context!' });
    }
    const { method, ...args } = req.body;
    try {

        const result = await ctx!.manager.combined(method as any, args);
        if (!result) return res.status(404).json({ error: 'No results' });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid or unsupported method' });
    }
}

export let fetchRoute: Route = new Route('fetch',fetch,true,AUTHROLE.USER);

