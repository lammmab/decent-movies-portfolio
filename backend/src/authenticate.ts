import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';

export function generate_token(isAdmin: boolean): string {
    const payload = { role: isAdmin ? "admin" : "user" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return token;
}

export function check_details(password: string) {
    debug(password);
    if (CONFIG.admin_passwords?.includes(password)) {
        debug(`Found ${password} in admin passwords`)
        return generate_token(true);
    }
    if (CONFIG.user_passwords?.includes(password)) {
        debug(`Found ${password} in user passwords`)
        return generate_token(false);
    }
    if (!CONFIG.password_protected) {
        debug(`Backend unprotected`)
        return generate_token(true);
    }

    return null;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        (req as any).user = decoded;
        next();
    });
}

export function requireRole(role: "admin" | "user") {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        debug(`role required: ${role}; user role: ${user}`);
        if (!user) return res.status(401).json({ message: "Access denied" });
        if (role && user.role !== role) {
            return res.status(403).json({ message: "Forbidden: insufficient permissions" });
        }
        next();
    };
}
