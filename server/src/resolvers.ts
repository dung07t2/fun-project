import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";

import { User } from "./entity/User";
import { Post } from "./entity/Post";
import {
  /*getConnection,*/ getMongoManager,
  getMongoRepository
} from "typeorm";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, context) => {
      const manager = getMongoManager(); // or connection.mongoManager
      return await manager.findOne(User, context.session.userId);
    },
    postById: async (_, { id }) => {
      const manager = getMongoManager(); // or connection.mongoManager
      return await manager.findOne(Post, id);
    },
    postsByUser: async (_, __, context) => {
      const manager = getMongoManager(); // or connection.mongoManager
      const user = await manager.findOne(User, context.session.userId);
      const postRepository = getMongoRepository(Post);
      const posts = await postRepository.find({
        where: {
          userId: { $eq: user!._id }
        }
      });
      // User for postgre
      // const connection = getConnection();
      // const posts = await connection
      // .getRepository(Post)
      // .createQueryBuilder("posts")
      // .leftJoinAndSelect("posts.user", "user")
      // .where("user._id = :id", { id: req.session.userId })
      // .getMany();
      return posts;
    },

    getAllPosts: async () => {
      // const manager = getMongoManager(); // or connection.mongoManager
      // const posts = await manager.find(Post);
      // return posts;
      const postsRepository = getMongoRepository(Post);
      const posts = await postsRepository.find({
        where: {},
        order: { created: "ASC" }
      });
      return posts;
    }
  },
  Mutation: {
    logout: async (_, __, { req, res }) => {
      await new Promise(res => req.session.destroy(() => res()));
      res.clearCookie("connect.sid");
      return true;
    },
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      const manager = getMongoManager();
      await manager.save(user);

      // user postgre
      // await User.create({
      //   email,
      //   password: hashedPassword
      // }).save();

      return true;
    },
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      context.session.userId = user._id;

      return user;
    },
    publishPost: async (_, args, context) => {
      // if (!context.session.userId) {
      //   return null;
      // }
      // using for postgre
      // const user = await User.findOne(req.session.userId);
      // const manager = getMongoManager();
      // const user = await manager.findOne( User, req.session.userId);
      // const post = await Post.create({
      //   postType,
      //   title,
      //   description,
      //   url,
      //   user
      // })
      // .save()
      // .then((res: Post) => res)
      // .catch((error: Error) => {
      //     throw error
      // });
      const manager = getMongoManager(); // or connection.mongoManager
      const user = await manager.findOne(User, context.session.userId);
      const nPost = new Post();
      nPost.postType = args.postType;
      nPost.title = args.title;
      nPost.description = args.description;
      nPost.url = args.url;
      nPost._user = user!;
      // nPost.uEmail = user!.email;
      const post = await manager
        .save(nPost)
        .then((res: Post) => res)
        .catch((error: Error) => {
          throw error;
        });

      return post;
    }
  }
};
