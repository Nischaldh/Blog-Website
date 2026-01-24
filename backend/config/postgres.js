import env from "../lib/env.js";
import pkg from "pg";

const {Pool} = pkg;

const pool = new Pool({
    connectionString: env.DATABASE_URL
});

export default pool;