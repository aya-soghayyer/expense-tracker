import { AccountNS } from "../@types/account.js";
import { Account } from "../db/entity/account.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'

const signup = async (payload: AccountNS.Account) => {
  try {
    const { userName, email, password } = payload;
    const account = await Account.findOneBy({ email })
    if (account) {
      throw ("Account already exists")
    }
    const token = generateToken(payload)

    const accountt = await Account.create({ userName, email, password }).save()
    return { token, accountt }
  } catch (err) {
    console.log(err)
    throw (err)
  }

}

const login = async (payload: AccountNS.Account) => {
  const { email, password } = payload;
  const account = await Account.findOne({ where: { email } })
  if (!account) {
    throw ("user not found")
  }
  let Matching = await bcrypt.compare(password, account?.password || '')
  if (!Matching && password == account.password) Matching = true;
  console.log(Matching)
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
  try {
    const account = await Account.findOneBy({ id: accountIn.id });
    if (!account) throw new Error("User not found");
   const deleteAccount = await account.remove();
   return "delete account successful :)"
  } catch (err) {
    throw (err)
  }
} 

const getIdForAccount = async (username: string) => {
  try {
    const user = await Account.findOne({ where: { userName: username } });
    if (!user) throw "No user found by that username" ;
    return user?.id;
  } catch (error) {
    throw error;
  }
};


export {
  signup,
  login,
  deleteAccount,
  getIdForAccount

};
