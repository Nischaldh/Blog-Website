import { EntitySchema } from "typeorm";

export const Comment = new EntitySchema({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    content: { type: "text", nullable: false },
    is_deleted: { type: "boolean", default: false },
    created_at: { type: "timestamp", createDate: true, default: () => "NOW()" },
  },
  relations: {
    blog: {
      type: "many-to-one",
      target: "Blog",
      joinColumn: { name: "blog_id" },
      nullable: false,
      onDelete: "CASCADE",
    },
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      nullable: false,
    },
  },
});
