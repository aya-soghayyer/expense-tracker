import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Account } from '../db/entity/account';


const login = async (email: string, password: string) => {
  
  try {
      const user = await Account.findOneBy({
        email,
        
      });
    console.log("test")  
      const passwordMatching = await bcrypt.compare(password, user?.password || '');
      console.log('test2')
      if (user && passwordMatching) {
        console.log('tesst')
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