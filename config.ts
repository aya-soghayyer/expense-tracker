import dotenv, { config } from 'dotenv';
dotenv.config({
<<<<<<< HEAD
    path: `.env.${process.env.NODE_ENV}`
=======
    path: process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : '.env'
>>>>>>> dev
});

export default config