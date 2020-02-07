import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    _id: String!
    email: String!
  }

  type Post {
    _id: String!
    postType: String!
    title: String!
    description: String
    url: String
    created: String
    _user: User
  }

  type Comment {
    _id: String!
    title: String!
    description: String!
    url: String!
    userId: String
  }

  type Query {
    me: User
    postById(id: String!): Post!
    postsByUser: [Post]
    getAllPosts: [Post]
  }

  type Mutation {
    logout: Boolean!
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    publishPost(
      postType: String!
      title: String!
      description: String
      url: String
      created: String
    ): Post
    comment(
      postType: String!
      title: String!
      description: String
      url: String
      userId: String
    ): Comment
  }
`;
