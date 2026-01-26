import pool from "../config/postgres.js";
import env from "./env.js";

// Auth user functions
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

// update user functions
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

// blog functions.

export const getBlogBySlugDB = async (slug) => {
  const query = `SELECT b.* , u.name as author_name 
                  FROM blogs b
                  JOIN users u on u.id = b.author_id
                  where b.slug = $1 AND b.is_deleted = false AND b.status = 'PUBLISHED';`;
  const result = await pool.query(query, [slug]);
  return result.rows[0] || null;
};

export const getBlogByIdDB = async (blogId)=>{
  const query = `SELECT b.* , u.name as author_name 
                  FROM blogs b
                  JOIN users u on u.id = b.author_id
                  where b.id = $1 AND b.is_deleted = false;`
  const result = await pool.query(query, [blogId]);
  return result.rows[0]||null;
}

export const getAllBlogDB = async () => {
  const query = `SELECT b.*, u.name as author_name
                  FROM blogs b
                  JOIN users u ON u.id = b.author_id
                  WHERE b.is_deleted = false AND b.status = 'PUBLISHED'
                  ORDER BY b.created_at DESC;`;
  const result = await pool.query(query);
  console.log(result.rows);
  return result.rows || null;
};


export const deleteBlogDB = async (blogId) => {
  const query = `
    UPDATE blogs
    SET is_deleted = true, updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [blogId]);
  return result.rows[0] || null;
};

export const getBlogsByTitleDB = async(title)=>{
  const query = `SELECT b.* , u.name as author_name 
                  FROM blogs b
                  JOIN users u on u.id = b.author_id
                  WHERE b.title LIKE $1  AND b.is_deleted = false;`
  const results = await pool.query(query, [`%${title}%`]);
  return results.rows||null;
}

export const createBlogDB = async (blogData)=>{
  const {title, slug, content, authorId, status, primaryImage, secondaryImage1, secondaryImage2} = blogData;
  const query = `INSERT INTO blogs (title, slug, content, author_id, status, primary_image, secondary_image_1, secondary_image_2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const values = [title, slug, content, authorId, status, primaryImage, secondaryImage1, secondaryImage2];
  const response = await pool.query(query, values);
  return response.rows[0]||null;
}

export const updateBlogDB = async (blogId, title, content, status) => {
  const query = `
    UPDATE blogs
    SET title = $1,
        content = $2,
        status = $3,
        updated_at = NOW()
    WHERE id = $4 AND is_deleted = false
    RETURNING *;
  `;
  const values = [title, content, status, blogId];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

// comment functions

export const addCommentDB = async (blogId, userId, content) => {
  const query = `
    INSERT INTO comments (blog_id, user_id, content)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [blogId, userId, content];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

export const getCommentsForBlogDB= async (blogId) => {
  const query = `
    SELECT c.*, u.name as user_name
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.blog_id = $1 AND c.is_deleted = false
    ORDER BY c.created_at ASC;
  `;
  const result = await pool.query(query, [blogId]);
  return result.rows|| null;
};


// Tag functions
export const getOrCreateTagDB = async (tagName) => {
  const selectQuery = `SELECT id, name FROM tags WHERE name = $1`;
  const selectResult = await pool.query(selectQuery, [tagName]);

  if (selectResult.rows.length > 0) return selectResult.rows[0]||null;

  const insertQuery = `INSERT INTO tags (name) VALUES ($1) RETURNING id, name`;
  const insertResult = await pool.query(insertQuery, [tagName]);
  return insertResult.rows[0]||null;
};

export const addBlogTagsDB = async (blogId, tagIds) => {
  if (!tagIds || tagIds.length === 0) return;

  const placeholders = tagIds.map((_, idx) => `($1, $${idx + 2})`).join(", ");
  const values = [blogId, ...tagIds];

  const query = `
    INSERT INTO blog_tags (blog_id, tag_id)
    VALUES ${placeholders}
    ON CONFLICT DO NOTHING;
  `;

  await pool.query(query, values);
};


export const getTagsForBlogDB = async (blogId) => {
  const query = `
    SELECT t.id, t.name
    FROM tags t
    JOIN blog_tags bt ON t.id = bt.tag_id
    WHERE bt.blog_id = $1
  `;
  const result = await pool.query(query, [blogId]);
  return result.rows||null;
};

export const clearBlogTagsDB = async (blogId) => {
  const query = `DELETE FROM blog_tags WHERE blog_id = $1`;
  await pool.query(query, [blogId]);
};


export const getCommentByIdDB = async (id)=>{
  const query = `SELECT c.*, u.name as user_name
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.id = $1 AND c.is_deleted = false;`;
  const result = await pool.query(query, [id]);
  return result.rows[0]||null;
}

export const getAllCommentsDB = async()=>{
  const query = `SELECT c.*, u.name as user_name
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.is_deleted = false
    ORDER BY c.created_at ASC;`;
  const result = await pool.query(query);
  return result.rows|| null;
}

export const getCommentByUserDB = async (userId)=>{
  const query = `SELECT c.*, u.name as user_name
                FROM comments c 
                JOIN users u on u.id = c.user_id
                WHERE c.user_id = $1 AND c.is_deleted = false;`;
  const result = await pool.query(query,[userId])
  return result.rows||null;
}

export const deleteCommentDB = async (commentId)=>{
  const query = `
    UPDATE comments
    SET is_deleted = true
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [commentId]);
  return result.rows[0] || null;
}

export const editCommentDB = async(commentId, content)=>{
  const query  = `
    UPDATE comments
    SET content = $1
    WHERE id = $2 AND is_deleted = false
    RETURNING *;
  `;
  const value = [content, commentId]
  const result = await pool.query(query, value);
  return result.rows[0] || null;
}