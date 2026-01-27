import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "../lib/env.js";
import { User } from "../models/User.entity.js";
import { Blog } from "../models/Blog.entity.js";
import { Tag } from "../models/Tag.entity.js";
import { Comment } from "../models/Comment.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,

  synchronize: false, 
  logging: true,

  entities: [User, Blog, Tag, Comment],
});