import pool from "../config/postgres.js";

const generateSlug = async (title) => {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  const query = `
    SELECT slug 
    FROM blogs 
    WHERE slug LIKE $1 AND is_deleted = false
  `;
  const result = await pool.query(query, [`${baseSlug}%`]);
  const existingSlugs = result.rows.map((row) => row.slug);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let count = 1;
  let newSlug;
  do {
    newSlug = `${baseSlug}-${count}`;
    count++;
  } while (existingSlugs.includes(newSlug));

  return newSlug;
};

export default generateSlug;