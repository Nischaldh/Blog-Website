import 'dotenv/config';

const env = {
    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    DEFAULT_AVATAR : process.env.CLOUDINARY_DEFAULT_AVATAR,
    DUMMY_HASH : process.env.DUMMY_HASH,

}


export default env;