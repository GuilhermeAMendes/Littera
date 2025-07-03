// External library
import { config } from "dotenv";
config();

if (!process.env.KEY) {
  throw new Error("SECRET KEY is missing in environment variables.");
}

export const EXPIRES = "3m";

export const SECRET_TOKEN_KEY = process.env.KEY;
