import pool from "../config/postgres.js";
import env from "./env.js";

export const checkUserByEmail = async (email) => {
    const query = `SELECT id, name, email, password, image FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
};

export const createUser = async (name, email, password) => {
    const query = `INSERT INTO USERS(name,email,password,image)
          VALUES ($1, $2, $3,$4)
          RETURNING id, name, email,image`;
    const values = [name, email, password, env.DEFAULT_AVATAR];
    const response = await pool.query(query, values);
    return response.rows[0] || null;

};

export const getUserById = async (id) => {
    const query = `
      SELECT id, name, email,password, image, created_at
      FROM users
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};



export const updateUserProfile = async (userId, name, email, password) => {
    const query = `UPDATE users
      SET
        name = $1,
        email = $2,
        password = $3,
        updated_at = NOW()
      WHERE id = $4
      RETURNING id, name, email, image
    `;
    const values = [name, email, password, userId];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};


export const updateUserProfilePic = async (userId, imageUrl) => {
  const query = `
    UPDATE users
    SET
      image = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING id, name, email, image
  `;
  const result = await pool.query(query, [imageUrl, userId]);
  return result.rows[0] || null;
};

