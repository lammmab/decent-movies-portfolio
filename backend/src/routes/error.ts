import {Route} from '../server/routing';
import {Request,Response} from 'express';
import { AppError } from '../middleware/error_handler';
import { AUTHROLE } from '../constants';

function route(req: Request,res: Response) {
    const err: AppError = new Error('This is a test error');
    err.status = 400;
    throw err;
}

export let error: Route = new Route('error',route,true,AUTHROLE.ADMIN);

