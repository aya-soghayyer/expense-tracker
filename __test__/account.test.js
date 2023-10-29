// import '../config.js';
import dotenv from 'dotenv'
import{AppDataSource, initialize } from '../dist/db/dataSource.js';
import { login } from "../dist/controllers/account.js";
import jwt from 'jsonwebtoken';
import {signup , deleteAccount , getIdForAccount  } from '../dist/controllers/account.js'



dotenv.config();

// beforeAll(async () => {
//   await initialize();
// });

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
          console.log('DB connected');
      }).catch(err => {
          console.log("DB connection failed", err);
      });
}, 30000);

afterAll(async () => {
  await AppDataSource.destroy();
});

const tmpData = {
  "email": "isra@gmail.com",
  "password": "1234"
};

// login
describe("Login process", () => {
  let data;


  beforeAll(async () => {
    data = await login({email:tmpData.email , password : tmpData.password});
  })

  it("returns a token", async () => {
    expect(data.token).toBeTruthy();
  });

  it("has a valid token", () => {
    const tokenIsValid = jwt.verify(data.token, process.env.SECRET_KEY || '');
    expect(tokenIsValid).toBeTruthy();
  });

  it("has valid payload", () => {
    const payload = jwt.decode(data.token, { json: true });
    expect(payload?.email).toEqual(tmpData.email);
  });


});

const signupData = {
    "userName": "asma ashqar",
    "email": "asma@gmail.com",
    "password": "1234"
  };

//signup
describe("Signup process", () => {
  let data;
  

  beforeAll(async () => {
    data = await signup({userName: signupData.userName,email:signupData.email , password : signupData.password});
  })

  it("returns a token", async () => {
    expect(data.token).toBeTruthy();
  });

  it("returns a account", async () => {
    expect(data.accountt).toBeTruthy();
  });


  it("has a valid token", () => {
    const tokenIsValid = jwt.verify(data.token, process.env.SECRET_KEY || '');
    expect(tokenIsValid).toBeTruthy();
  });

  // it("has valid payload", () => {
  //   const payload = jwt.decode(data.token, { json: true });
  //   expect(payload?.email).toEqual(tmpData.email);
  // });


});

//delete
describe("delete account  process", () => {
  let data;
  beforeAll(async () => {
    const id = await getIdForAccount(signupData.userName)
    data = await deleteAccount({id});
  })

  it("returns a successful", async () => {
    expect(data).toBeTruthy();
  });

});


//   const signup = async (payload: AccountNS.Account) => {
//     const { userName, email, password} = payload;
//     const account = await Account.findOneBy({ email })
//     if (account) {
//         throw ("Account already exists")
//     }
//     const token = generateToken(payload)
  
//     Account.create({ userName, email, password }).save()
//     return token
  
//   }

