import { Router, Request, Response } from 'express';
const { Route } = require("../routing.ts");

const router = Router();

router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Authenticated!' });
});

export const pingRoute = new Route('authenticate', router);
