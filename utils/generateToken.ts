import jwt from 'jsonwebtoken';
import { AccountNS } from '../@types/account';


const generateToken = (account: AccountNS.Account) => {
    const payload = {
        email: account.email,
        userName: account.userName
    };

    const secretKey = process.env.SECRET_KEY || '';

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secretKey, options);
};

export default generateToken;