import { AccountNS } from "../@types/account";
import { Account } from "../db/entity/account";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'

const signup = async (payload: AccountNS.Account) => {
  const { userName, email, password} = payload;
  const account = await Account.findOneBy({ email })
  if (account) {
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
  const Matching = await bcrypt.compare(password, account?.password || '')
  if (Matching) {
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
    if (!account) throw new Error("User not found");

    await account.remove();

  } 
export {
  signup,
  login,
  deleteAccount
  
};
