import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "../lib/env.js";
import { User } from "../models/User.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,

  synchronize: false, 
  logging: true,

  entities: [User],
});