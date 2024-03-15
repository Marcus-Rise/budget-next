import dotenv from 'dotenv-flow';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export {};
