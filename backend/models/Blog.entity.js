import { EntitySchema } from "typeorm";

export const Blog = new EntitySchema({
  name: "Blog",
  tableName: "blogs",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    slug: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    content: {
      type: "text",
      nullable: false,
    },
    primary_image: {
      type: "text",
      nullable: false,
    },
    secondary_image_1: {
      type: "text",
      nullable: true,
    },
    secondary_image_2: {
      type: "text",
      nullable: true,
    },
    status: {
      type: "enum",
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
    is_deleted: {
      type: "boolean",
      default: false,
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
    author: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "author_id" },
    },
    tags: {
      type: "many-to-many",
      target: "Tag",
      joinTable: {
        name: "blog_tags",
        joinColumn: { name: "blog_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" },
      },
      cascade: true,
    },
    comments: {
      type: "one-to-many",
      target: "Comment",
      inverseSide: "blog",
    },
  },
});
