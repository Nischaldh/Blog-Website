import { EntitySchema } from "typeorm";

export const Tag = new EntitySchema({
  name: "Tag",
  tableName: "tags",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 50,
      unique: true,
      nullable: false,
    },
  },
  relations: {
    blogs: {
      type: "many-to-many",
      target: "Blog",
      inverseSide: "tags",
      joinTable: false, 
    },
  },
});
