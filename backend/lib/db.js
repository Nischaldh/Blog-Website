import pool from "../config/postgres.js";
import env from "./env.js";

export const checkUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    if (result.rows.length > 0) {
      return {success:true , user: result.rows[0]};
    }
    return false;
  } catch (error) {
    console.error("DB Error - checkUserByEmail:", error);
    throw error;
  }
};

export const createUser = async (name, email, password) => {
  try {
    const query = `INSERT INTO USERS(name,email,password,image)
          VALUES ($1, $2, $3,$4)
          RETURNING id, name, email,image`;
    const values = [name, email, password, env.DEFAULT_AVATAR];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("DB Error - createUser:", error);
    throw error;
  }
};


