import dotnv from "dotenv";

dotnv.config();
const { NODE_ENV, PORT } = process.env;

function env(key: string, defaultValue = ""): string {
  return process.env[key] ?? (defaultValue as string);
}

export default {
  env,
  PORT,
  NODE_ENV,
};
