import express from 'express';
import { signup, login, deleteAccount/* updateAcountPassword, forgetPassword, resetAccountPassword */} from '../controllers/account.js'
// import { authenticate } from '../middleware/auth.js';
// import { Account } from '../db/entity/account';
// import { ExpressNS } from '../../@types/index.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Signup account ..POST.. 
router.post("/expense-tracker/signup", async (req: express.Request, res: express.Response) => {
  try {
    if (req.body.userName && req.body.password && req.body.email) {
      const sign = await signup(req.body);
      return res.status(201).json({ sign });
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
router.post("/expense-tracker/login", async (req: express.Request, res: express.Response) => {
  try {
    if (req.body.email && req.body.password) {
      const log = await login(req.body)
      res.status(200).json(log);
    } else {
      res.status(400).json("All fields are required");
    }
  } catch (error) {
    console.log(error);
    if (error === "invalid email or password") {
      return res.status(400).json("invalid email or password");
    }
    res.status(500).json("internal server error")
  }
});

// Logout account ..GET..
router.get("/expense-tracker/logout", async (req, res) => {
  res.status(200).json("Account logged out successfully");
});

// Delete account ..DELETE..
router.delete("/expense-tracker/", authenticate, async (req: ExpressNS.RequestWithUser, res: express.Response) => {
 try {
  const account = req.account;

  if (!account) {
    return res.status(404).json({ error: "Account not found."});
  }
  await deleteAccount(account);
  res.status(200).json("User deleted successfully");
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
 } 
});

/*// Update account password ..PUT..
router.put("/expense-tracker/password", authenticate, async (req: ExpressNS.RequestWithUser, res: express.Response) => {
try {
  const account = req.account;

  if (!account) {
    return res.status(400).json({ error: "User not found." });
  }

  if (!req.body.oldPassword) {
    return res.status(400).json({ error: "Old Password is required" });
  }

  if (!req.body.newPassword) {
    return res.status(400).json({ error: "New Password is required" });
  }

  const updateUser = await updateAcountPassword(req.body.oldPassword, req.body.newPassword, account);

  res.status(200).json(updateUser);
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

// Forget password ..PUT..
router.post("/expense-tracker/forget-password", authenticate, async (req: ExpressNS.RequestWithUser, res: express.Response) => {
  try {
    const account = req.account;

    console.log(account);
    if (!account) {
      return res.status(400).json({ error: "User not found. Please make sure you are logged in or check your account is activated" });
    }

    if (!req.body.email) {
      return res.status(400).json({ error: "email is required" });
    }

    const updateUser = await forgetPassword(req.body.email, account);

    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Reset password ..POST..
router.post("/expense-tracker/reset-password", authenticate, async (req: ExpressNS.RequestWithUser, res: express.Response) => {
  try {

    const token = req.query.token

    const decodedToken = jwt.verify(token as string, process.env.SECRET_KEY as string) as Account;

    const account = await Account.findOneBy({ email: decodedToken.email });

    if (!account) {
      return res.status(400).json({ error: "Account not found" });
    }

    if (!req.body.newPassword) {
      return res.status(400).json({ error: "New Password is required" });
    }

    const updateUser = await resetAccountPassword(req.body.newPassword, account);

    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } 
});*/

export default router;