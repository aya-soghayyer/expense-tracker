import { AccountNS } from "../../@types/account.js";
import { Account  } from "../db/entity/account";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'


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
const signup = async (payload: AccountNS.Account) => {
  const { userName, email, password, bio } = payload;
  const user = await Account.findOneBy({ email })
  if (user) {
      throw ("Account already exists")
  }
  const token = generateToken(payload)

  Account.create({ userName, email, password }).save()
  return token

}

const login = async (payload: AccountNS.Account) => {
  const { email, password } = payload;
  const account = await Account.findOne({ where: { email } })
  if (!account) {
      throw ("user not found")
  }
  const passwordMatching = await bcrypt.compare(password, account?.password || '')
  if (passwordMatching) {
      const token = generateToken(account)
      return {
          account: account,
          token
      }
  } else {
      throw ("Invalid email or password")
  }
}

const deleteAccount = async (accountIn: AccountNS.Account) => {

  const account = await Account.findOneBy({ id: accountIn.id });
  if (!account) throw new Error("Account not found");

      await account.remove();
  } 
  
 /* const updateAcountPassword = async (oldPassword: string, newPassword: string, accountIn: AccountNS.Account) => {
    try {
        const account = await Account.findOneBy({ id: accountIn.id });

        if (!account) throw new Error('Account not found');

        const passwordMatching = await bcrypt.compare(oldPassword, account?.password || '')

        await updateUserCache(account.id);

        if (passwordMatching) {
            account.password = await bcrypt.hash(newPassword, 10);
            await account.save();
            return { message: 'Password updated successfully' };
        } else {
            throw ("invalid password")
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: (error instanceof Error) ? error.message : 'Internal Server Error'
        };
    }
}

const forgetPassword = async (email: string, accountIn: Account) => {
  try {
      const account = await Account.findOneBy({ id: accountIn.id });

      if (!account) throw new Error('User not found');

      const token = generateToken(account);

      const passwordResetLink = `http://localhost:5000/users/reset-password?token=${token}`;

      const subject = 'Password Reset Request';
      const message = `You requested to reset your password. Click the following link to reset your password: ${passwordResetLink}`;
      // await sendEmail(email, subject, message);

      return { message: 'Password reset instructions sent successfully' };
  } catch (error) {
      console.error('Error sending password reset instructions:', error);
      return {
          success: false,
          message: (error instanceof Error) ? error.message : 'Internal Server Error'
      };
  }
};

const resetAccountPassword = async (newPassword: string, account: Account) => {
  try {

      account.password = await bcrypt.hash(newPassword, 10);
      await account.save();

      return { message: 'Password updated successfully' };
  } catch (error) {
      console.error('Error resetting user password:', error);
      return {
          success: false,
          message: (error instanceof Error) ? error.message : 'Internal Server Error'
      };
  }
}*/

export {
  signup,
  login,
  deleteAccount
  /*updateAcountPassword,
  forgetPassword,
resetAccountPassword*/
}
