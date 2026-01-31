import { AppDataSource } from "../config/type-orm.js";
import { getTagsForBlogDB } from "../lib/db.js";
// import {
//   addBlogTagsDB,
//   addCommentDB,
//   clearBlogTagsDB,
//   createBlogDB,
//   deleteBlogDB,
//   getAllBlogDB,
//   getBlogByIdDB,
//   getBlogBySlugDB,
//   getBlogsByTitleDB,
//   getCommentsForBlogDB,
//   getTagsForBlogDB,
//   updateBlogDB,
//   getOrCreateTagDB,
//   getBlogByTagDB,
// } from "../lib/db.js";
import generateSlug from "../lib/slugify.js";
import { Blog } from "../models/Blog.entity.js";
import { Tag } from "../models/Tag.entity.js";

const blogRepo = AppDataSource.getRepository(Blog);
const tagRepo = AppDataSource.getRepository(Tag);

export const getAllBlogService = async () => {
  try {
    // const blogs = await getAllBlogDB();
    const blogs = await blogRepo.find({
      where: { is_deleted: false, status: "PUBLISHED" },
      relations: ["author", "tags","comments","comments.user"],
      order: { created_at: "DESC" },
    });
    // console.log(blogs);
    if (!blogs.length) {
      return { code: 404, success: false, message: "There are no blogs" };
    }
    return { success: true, blogs };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogByIdService = async (blogId) => {
  try {
    // const blog = await getBlogByIdDB(blogId);
    const blog = await blogRepo.findOne({
      where: { id: blogId, is_deleted: false },
      relations: ["author", "tags", "comments", "comments.user"],
    });

    if (!blog) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    // const blogTags = await getTagsForBlogDB(blog.id);
    // const comments = await getCommentsForBlogDB(blog.id);
    // return {
    //   success: true,
    //   blog: { ...blog, tags: blogTags, comments },
    // };
    return { success: true, blog };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogBySlugService = async (slug) => {
  try {
    // const blog = await getBlogBySlugDB(slug);
    const blog = await blogRepo.findOne({
      where: {
        slug,
        is_deleted: false,
        status: "PUBLISHED",
      },
      relations: ["author", "tags", "comments", "comments.user"],
    });

    if (!blog) {
      return { code: 404, success: false, message: "Blog not Found" };
    }
    // const blogTags = await getTagsForBlogDB(blog.id);
    // const comments = await getCommentsForBlogDB(blog.id);

    return { success: true, blog };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogByTitleService = async (title) => {
  try {
    // const blogs = await getBlogsByTitleDB(title);
    const blogs = await blogRepo
      .createQueryBuilder("blog")
      .leftJoin("blog.author", "author")
      .addSelect(["author.id", "author.name", "author.email", "author.image"])
      .where("blog.is_deleted = false")
      .andWhere("blog.title ILIKE :title", {
        title: `%${title}%`,
      })
      .orderBy("blog.created_at", "DESC")
      .getMany();

    if (!blogs.length) {
      return { code: 404, success: false, message: "Blog not Found" };
    }
    console.log(blogs);
    return { success: true, blogs };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const postBlogService = async (blogData) => {
  try {
    // const {
    //   title,
    //   content,
    //   authorId,
    //   status,
    //   tags = [],
    //   primaryImage,
    //   secondaryImage1,
    //   secondaryImage2,
    // } = blogData;
    // const slug = await generateSlug(title);
    // // const postBlogData = {
    // //   title,
    // //   slug,
    // //   content,
    // //   authorId,
    // //   primaryImage,
    // //   secondaryImage1,
    // //   secondaryImage2,
    // //   status,
    // // };
    // // const blog = await createBlogDB(postBlogData);
    // const blog = blogRepo.create({
    //   title,
    //   slug,
    //   content,
    //   status,
    //   primaryImage,
    //   secondaryImage1,
    //   secondaryImage2,
    //   author: { id: authorId },
    // });

    // // if (tags.length > 0) {
    // //   const tagIds = [];
    // //   for (const tagName of tags) {
    // //     const tag = await getOrCreateTagDB(tagName);
    // //     tagIds.push(tag.id);
    // //   }
    // //   await addBlogTagsDB(blog.id, tagIds);
    // // }
    // // const blogTags = await getTagsForBlogDB(blog.id);

    // if (tags.length) {
    //   blog.tags = [];
    //   for (const name of tags) {
    //     let tag = await tagRepo.findOne({ where: { name } });
    //     if (!tag) tag = await tagRepo.save(tagRepo.create({ name }));
    //     blog.tags.push(tag);
    //   }
    // }
    // await blogRepo.save(blog);
    // return { success: true, blog };

    // ADD Transatoin:

    return AppDataSource.transaction(async (manager) => {
      const {
        title,
        content,
        authorId,
        status,
        tags = [],
        primaryImage,
        secondaryImage1,
        secondaryImage2,
      } = blogData;

      const slug = await generateSlug(title);

      const blog = blogRepo.create({
        title,
        slug,
        content,
        status,
        primary_image: primaryImage,
        secondary_image_1: secondaryImage1,
        secondary_image_2: secondaryImage2,
        author: { id: authorId },
      });

      if (tags.length) {
        blog.tags = [];

        for (const name of tags) {
          let tag = await tagRepo.findOne({ where: { name } });

          if (!tag) {
            tag = tagRepo.create({ name });
            await tagRepo.save(tag);
          }

          blog.tags.push(tag);
        }
      }

      await blogRepo.save(blog);
      return { success: true, blog };
    });
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const updateBlogService = async (blogId, blogData) => {
  try {
    // // const { title, content, status, tags } = blogData;
    // // const updated = await updateBlogDB(blogId, title, content, status);
    // // if (!updated) {
    // //   return { success: false, code: 404, message: "Blog not found" };
    // // }
    // // if (tags !== undefined) {
    // //   await clearBlogTagsDB(blogId);
    // //   if (tags.length > 0) {
    // //     const tagIds = [];
    // //     for (const tagName of tags) {
    // //       const tag = await getOrCreateTagDB(tagName);
    // //       tagIds.push(tag.id);
    // //     }
    // //     await addBlogTagsDB(blogId, tagIds);
    // //   }
    // // }

    // // const updatedTags = await getTagsForBlogDB(blogId);
    // // if (!updatedTags) {
    // //   return { success: false, code: 404, message: "Tags not found" };
    // // }
    // // return { success: true, blog: { ...updated, tags: updatedTags } };

    // const blog = await blogRepo.findOne({
    //   where: { id: blogId, isDeleted: false },
    //   relations: ["tags"],
    // });

    // if (!blog) {
    //   return { success: false, code: 404, message: "Blog not found" };
    // }

    // blog.title = blogData.title ?? blog.title;
    // blog.content = blogData.content ?? blog.content;
    // blog.status = blogData.status ?? blog.status;

    // if (blogData.tags) {
    //   blog.tags = [];
    //   for (const name of blogData.tags) {
    //     let tag = await tagRepo.findOne({ where: { name } });
    //     if (!tag) tag = await tagRepo.save(tagRepo.create({ name }));
    //     blog.tags.push(tag);
    //   }
    // }

    // await blogRepo.save(blog);
    // return { success: true, blog };

    return await AppDataSource.transaction(async (manager) => {
      const blog = await blogRepo.findOne({
        where: { id: blogId, is_deleted: false },
        relations: ["tags"],
      });

      if (!blog) {
        return {
          success: false,
          code: 404,
          message: "Blog not found",
        };
      }

      blog.title = blogData.title ?? blog.title;
      blog.content = blogData.content ?? blog.content;
      blog.status = blogData.status ?? blog.status;

      if (blogData.primaryImage) {
        blog.primary_image = blogData.primaryImage;
      }

      if (blogData.secondaryImage1 !== undefined) {
        blog.secondary_image_1 = blogData.secondaryImage1;
      }

      if (blogData.secondaryImage2 !== undefined) {
        blog.secondary_image_2 = blogData.secondaryImage2;
      }

      if (Array.isArray(blogData.tags)) {
        blog.tags = [];

        for (const name of blogData.tags) {
          let tag = await tagRepo.findOne({ where: { name } });

          if (!tag) {
            tag = tagRepo.create({ name });
            await tagRepo.save(tag);
          }

          blog.tags.push(tag);
        }
      }

      await blogRepo.save(blog);

      return {
        success: true,
        blog,
      };
    });
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const deleteBlogService = async (blogId) => {
  try {
    // const deleted = await deleteBlogDB(blogId);
    // if (!deleted) {
    //   return { success: false, code: 404, message: "Blog not found" };
    // }
    // return { success: true, blog: deleted };
    const blog = await blogRepo.findOneBy({ id: blogId });
    if (!blog) {
      return { success: false, code: 404, message: "Blog not found" };
    }

    blog.is_deleted = true;
    await blogRepo.save(blog);

    return { success: true, blog };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogsFromTagsService = async (tags) => {
  try {
    // const blogs = await getBlogByTagDB(tagNames);
    const blogs = await blogRepo
      .createQueryBuilder("blog")
      .leftJoinAndSelect("blog.author", "author")
      .leftJoinAndSelect("blog.tags", "tag")
      .leftJoinAndSelect("blog.comments", "comments")
      .leftJoinAndSelect("comments.user", "commentUser")
      .where("blog.is_deleted = false")
      .andWhere("blog.status = :status", { status: "PUBLISHED" })
      .andWhere("LOWER(tag.name) IN (:...tags)", {
        tags: tags.map((t) => t.toLowerCase()),
      })
      .orderBy("blog.created_at", "DESC")
      .getMany();

    console.log(blogs);

    if (!blogs || blogs.length === 0) {
      return { success: false, code: 404, message: "Blogs not found" };
    }
    return { success: true, blogs };
  } catch (error) {
    console.error("Get Blogs From Tags Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogsByUserService = async (userId) => {
  try {
    const blogs = await blogRepo.find({
      where: { author: { id: userId }, is_deleted: false },
      relations: ["author", "tags"],
      order: { created_at: "DESC" },
    });

    if (!blogs.length) {
      return {
        code: 404,
        success: false,
        message: "No blogs found for this user",
      };
    }
    return { success: true, blogs };
  } catch (error) {
    console.error("Get Blogs By User Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};
