import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    userprofile: UserProfile
  }

  type UserProfile {
    id: ID!
    user: User!
    description: String!
    color: String!
    favoriteAnime: String
    favoriteManga: String
    favoriteChar: String
  }

  type AuthPayload {
    accessToken: String
    user: User
  }

  type Query {
    getUser(id: ID): User
    getUsers: [User]
    getUserProfile(id: ID): UserProfile
    getUserProfiles: [UserProfile]
  }

  input UserInput {
    username: String
    password: String
  }

  input ProfileInput {
    description: String
    color: String
    favoriteAnime: String
    favoriteManga: String
    favoriteChar: String
  }

  type Mutation {
    createUser(user: UserInput): User
    loginUser(user: UserInput): AuthPayload
    logoutUser: Boolean
    updateTokens: AuthPayload
    deleteUser(id: ID): String

    createProfile(profile: ProfileInput): UserProfile
    updateProfile(id: ID, profile: ProfileInput): UserProfile
  }
`;
