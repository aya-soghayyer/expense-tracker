import express from 'express';
import { Account } from '../db/entity/account';
namespace ExpressNS {
    export interface RequestWithAccount extends express.Request {
         account?: Account | null;
    }
}