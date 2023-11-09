import jwt from 'jsonwebtoken';
import { AccountNS } from '../@types/account.js';


const generateToken = (account: AccountNS.Account) => {
    const payload = {
        email: account.email,
        userName: account.userName
    };

    const secretKey = process.env.SECRET_KEY || '1231234';

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secretKey, options);
};

export default generateToken;