import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Account } from '../db/entity/account';


const login = async (email: string, password: string) => {
    try {
      const user = await Account.findOneBy({
        email,
        password
      });
  
      const passwordMatching = await bcrypt.compare(password, user?.password || '');
  
      if (user && passwordMatching) {
        const token = jwt.sign(
          {
            email: user.email,
            fullName: user.userName
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: "30m"
          }
        );
        return token;
      } else {
        throw ("Invalid Username or password!");
      }
    } catch (error) {
      throw ("Invalid Username or password!");
    }
  }
  
  export {
    
    login
  }