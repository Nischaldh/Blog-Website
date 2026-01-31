import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    password: {
      type: "text",
      nullable: false,
      select: false,
    },
    image: {
      type: "text",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
      default: () => "NOW()",
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
      default: () => "NOW()",
    },
  },
  relations: {
    blogs: {
      type: "one-to-many",
      target: "Blog",
      inverseSide: "author",
    },
  },
});
