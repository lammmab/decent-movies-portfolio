import jwt, { SignOptions } from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';
import { AUTHROLE } from './constants';

export function generate_token(isAdmin: boolean): string {
    const payload = { role: isAdmin ? AUTHROLE.ADMIN : AUTHROLE.USER };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: CONFIG.session_duration as string } as SignOptions);

    return token;
}

export function check_details(password: string) {
    if (CONFIG.admin_passwords?.includes(password)) {
        return generate_token(true);
    }
    if (CONFIG.user_passwords?.includes(password)) {
        return generate_token(false);
    }
    if (!CONFIG.password_protected) {
        return generate_token(true);
    }

    return null;
}

export function is_authenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        (req as any).user = decoded;
        next();
    });
}

export function require_role(role: AUTHROLE) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user) return res.status(401).json({ message: "Access denied" });
        if (user.role < role) {
            return res.status(403).json({ message: "Forbidden: insufficient permissions" });
        }
        next();
    };
}
