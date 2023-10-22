import express from 'express';
// import { Category } from '../db/entity/category';
import db from '../db/dataSource'
import { Expense } from '../db/entity/expense';
import { Account } from '../db/entity/account';
import { login } from '../controllers/account';


const router = express.Router();


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    login(email, password)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(401).send(err);
      })
  });








export default router;