import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { Account } from "../db/entity/account.js";
import { ExpressNS } from "../@types/index.js";

const authenticate: RequestHandler<any, any, Record<string, any>, any, Record<string, any>> = async (req, res, next) => {
    const token = req.headers["authorization"] || "";
    let validToken;
    try {
        validToken = jwt.verify(token, process.env.SECRET_KEY || "");
    } catch (error) {
        validToken = false;
    }

    if (validToken) {
        const decoded = jwt.decode(token, { json: true });
        if (decoded?.email) {
            const account = await Account.findOneBy({ email: decoded.email });
            (req as ExpressNS.RequestWithAccount).account = account || null;
        } else {
            (req as ExpressNS.RequestWithAccount).account = null;
        }
        next();
    } else {
        res.status(401).send("You are unauthorized, login to continue");
    }
};

export { authenticate };
import 'dotenv/config';


