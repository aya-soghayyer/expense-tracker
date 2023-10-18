import dotenv, { config } from 'dotenv';
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

export default config