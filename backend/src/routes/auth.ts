import {Route} from '../server/routing';
import {Request,Response} from 'express';
import { check_details } from '../authenticate';

function authenticate(req: Request,res: Response) {
    const password = req.body.password;
    if (!password) { res.status(401).json({ message: 'Malformed request' }); return; }
    const token = check_details(password);
    if (!token) {
        res.status(401).json({ message: 'Invalid credentials provided' });
        return;
    }
    res.json({ message: 'Authenticated', session: token });
}

export let auth: Route = new Route('auth',authenticate)

