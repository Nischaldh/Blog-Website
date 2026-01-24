import pool from "../config/postgres.js";

export const checkUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    if (result.rows.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("DB Error - checkUserByEmail:", error);
    throw error;
  }
};

export const createUser = async (name, email, password) => {
  try {
    const query = `INSERT INTO USERS(name,email,password)
          VALUES ($1, $2, $3)
          RETURNING id, name, email`;
    const values = [name, email, password];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("DB Error - createUser:", error);
    throw error;
  }
};
