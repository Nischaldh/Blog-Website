import 'dotenv/config';

const env = {
    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    DEFAULT_AVATAR : process.env.CLOUDINARY_DEFAULT_AVATAR,
    DUMMY_HASH : process.env.DUMMY_HASH,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY : process.env.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_NAME : process.env.CLOUDINARY_NAME

}


export default env;