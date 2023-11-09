// import '../config.js';
import dotenv from 'dotenv'
import{AppDataSource, initialize } from '../dist/db/dataSource.js';
import accountRouter from '../dist/routers/account.js';
import { login } from "../dist/controllers/account.js";
import jwt from 'jsonwebtoken';
import express from  "express"
import {signup , deleteAccount , getIdForAccount  } from '../dist/controllers/account.js'
import supertest from 'supertest';
import expenseRouter from '../dist/routers/expenses.js'
import { Expense } from '../dist/db/entity/expense.js';




dotenv.config();
const app = express();
app.use(express.json());
app.use('/expense-tracker/accounts', accountRouter)
app.use('/expense-tracker/expenses',expenseRouter);

app.use(express.urlencoded({ extended: false }));



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

  it("has valid payload", async () => {
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


//get expense
const request= supertest('http://localhost:3000');
describe("getting expenses proccess ", () => {

  it("get all expenses ", async () => {
    const response = (await request.get("/expense-tracker/expenses/"))
    expect(response.status).toBe(200);
  });

  it("get max amount for expenses ", async () => {
    const response = (await request.get("/expense-tracker/expenses/max"))
    expect(response.status).toBe(200);
  });

  it("get min amount for expenses ", async () => {
    const response = (await request.get("/expense-tracker/expenses/min"))
    expect(response.status).toBe(200);
  });
});
