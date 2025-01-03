const jwt = require('jsonwebtoken');

const config = require('../config/config');

class AuthMiddleware {
    async adminMiddleware(req, res, next) {
        try {
            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                return res.status(400).json({
                    ok: false,
                    message: "Auth bearer token is missing"
                });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    ok: false,
                    message: "no token provided"
                });
            }
            const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
            if (!decoded.role) {
                return res.status(401).json({
                    ok: false,
                    message: "Unauthorized, invalid token"
                })
            }
            if (decoded.role !== "admin") {
                return res.status(403).json({
                    ok: false,
                    message: "Forbidden,you don't have access"
                })
            }
            next();
        } catch (e) {
            console.error(e);
            res.status(401).json({
                ok: false,
                message: "Unauthorized, token is invalid or expired"
            });
        }
    }
}

module.exports = new AuthMiddleware();
