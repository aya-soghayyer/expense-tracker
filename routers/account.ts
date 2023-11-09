import express from 'express';
import { signup, login, deleteAccount } from '../controllers/account.js'
import { authenticate } from '../middleware/auth.js';
import { ExpressNS } from '../@types/index.js';
import jwt from 'jsonwebtoken';
import passport, { session } from "passport"
import { Account } from 'aws-sdk';
import FacebookStrategy from "passport-facebook"
import { Session } from 'inspector';

const router = express.Router();

// Signup account ..POST.. 
router.post("/signup", async (req: express.Request, res: express.Response) => {
  try {
    if (req.body.userName && req.body.password && req.body.email) {
      const sign = await signup(req.body);
      return res.status(201).send({ sign });
    } else {
      return res.status(400).json("All fields are required");
    }
  } catch (error) {
    console.error(error);
    if (error === "Account already exists") {
      return res.status(409).json("Account already exists");
    }
    return res.status(500).json("Internal server error");

  }
});

// Login account ..POST..
router.post("/login", async (req: express.Request, res: express.Response) => {
  try {
    if (req.body.email && req.body.password) {
      const log = await login(req.body)
      res.status(200).send({
        "Id": log.account.id,
        "User Name": log.account.userName,
        "token": log.token
      });
    } else {
      res.status(400).json("All fields are required");
    }
  } catch (error) {
    console.log(error);
    if (error === "Invalid email or password") {
      return res.status(400).send("Invalid email or password");
    }
    res.status(500).send("Internal server error")
  }
});

// Logout account ..GET..
router.get("/logout", async (req, res) => {

  res.cookie('fullName', '', {
    maxAge: -1,  // This means the cookie will be deleted
    expires: new Date(Date.now() - 1000)
  });
  res.cookie('loginTime', '', {
    maxAge: -1
  });
  res.cookie('token', '', {
    maxAge: -1
  });
  res.status(200).send("Account logged out successfully");
});

// Delete account ..DELETE..
router.delete("/", authenticate, async (req: ExpressNS.RequestWithAccount, res: express.Response) => {
  try {
    const account = req.account;
    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }
    await deleteAccount(account);
    res.status(200).send("account deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});







export default router;