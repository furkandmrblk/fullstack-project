import { gql } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

export const typeDefs: any = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    userprofile: UserProfile
    list: List
    friendlist: FriendList
    friendrequest: FriendRequest
    isAdmin: Boolean
    date: String
    lastTimeOnline: String
    isOnline: Boolean
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

  type List {
    id: ID!
    user: User!

    finishedAnimes: [String]
    watchingAnimes: [String]
    watchlistAnimes: [String]

    finishedMangas: [String]
    watchingMangas: [String]
    watchlistMangas: [String]
  }

  type FriendList {
    id: ID!
    user: User!

    friends: [String]
  }

  type FriendRequest {
    id: ID!
    user: User!

    incomingUserId: String
  }

  type FriendRequests {
    incomingUser: String
    incomingUserId: String
  }

  type News {
    title: String
    text: String
    date: String
  }

  type AuthPayload {
    accessToken: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getCurrentUser: User

    getUserProfile(id: ID!): UserProfile
    getUserProfiles: [UserProfile]
    getCurrentUserProfile: UserProfile

    getList(id: ID!): List
    getLists: [List]
    getCurrentList: List

    getFriendList: [User]

    getNews: [News]
  }

  input UserInput {
    username: String!
    password: String!
  }

  input ProfileInput {
    description: String
    color: String
    favoriteAnime: String
    favoriteManga: String
    favoriteChar: String
  }

  input ListInput {
    finishedAnimes: [String]
    watchingAnimes: [String]
    watchlistAnimes: [String]

    finishedMangas: [String]
    watchingMangas: [String]
    watchlistMangas: [String]
  }

  input RequestInput {
    username: String
  }

  input AcceptInput {
    accept: Boolean
    id: String
  }

  input NewsInput {
    title: String
    text: String
  }

  input WarnInput {
    id: String
  }

  input BanInput {
    id: String
  }

  type Mutation {
    updateAllUsers(key: String): String

    createUser(user: UserInput): User
    loginUser(user: UserInput): AuthPayload
    logoutUser: Boolean
    updateTokens: AuthPayload
    deleteUser(password: String!): String

    changeUsername(username: String!): User
    changePassword(oldPassword: String!, password: String!): User

    createProfile(profile: ProfileInput): UserProfile
    updateProfile(profile: ProfileInput): UserProfile

    addList(list: ListInput): List

    sendFriendRequest(request: RequestInput): FriendRequest
    acceptFriendRequest(accept: AcceptInput): FriendList
    deleteFriend(id: ID!): String

    createNews(news: NewsInput): News

    warnUser(warn: WarnInput): String
    banUser(ban: BanInput): String
  }

  type Subscription {
    getFriendRequests: [FriendRequests]
  }
`;
