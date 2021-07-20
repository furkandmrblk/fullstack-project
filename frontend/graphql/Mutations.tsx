import { gql } from '@apollo/client';

// Auth Mutations

export const createUserM = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      password
    }
  }
`;

export const loginUserM = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(user: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const logoutUserM = gql`
  mutation {
    logoutUser
  }
`;

export const updateTokensM = gql`
  mutation updateTokens {
    updateTokens {
      accessToken
    }
  }
`;

export const deleteUserM = gql`
  mutation deleteUser($password: String!) {
    deleteUser(password: $password)
  }
`;

export const changeUsernameM = gql`
  mutation changeUsername($username: String!) {
    changeUsername(username: $username) {
      username
    }
  }
`;

export const changePasswordM = gql`
  mutation changePassword($password: String!, $oldPassword: String!) {
    changePassword(password: $password, oldPassword: $oldPassword) {
      username
      password
    }
  }
`;

// User Mutations

export const createProfileM = gql`
  mutation createProfile(
    $description: String!
    $color: String!
    $favoriteChar: String
    $favoriteAnime: String
    $favoriteManga: String
  ) {
    createProfile(
      profile: {
        description: $description
        color: $color
        favoriteChar: $favoriteChar
        favoriteAnime: $favoriteAnime
        favoriteManga: $favoriteManga
      }
    ) {
      user {
        username
      }
      id
      description
      color
      favoriteChar
      favoriteAnime
      favoriteManga
    }
  }
`;

// List Mutations

export const addListM = gql`
  mutation addList(
    $finishedAnimes: [String]
    $watchingAnimes: [String]
    $watchlistAnimes: [String]
    $finishedMangas: [String]
    $watchingMangas: [String]
    $watchlistMangas: [String]
  ) {
    addList(
      list: {
        finishedAnimes: $finishedAnimes
        watchingAnimes: $watchingAnimes
        watchlistAnimes: $watchlistAnimes
        finishedMangas: $finishedMangas
        watchingMangas: $watchingMangas
        watchlistMangas: $watchlistMangas
      }
    ) {
      id
      finishedAnimes
      watchingAnimes
      watchlistAnimes
      finishedMangas
      watchingMangas
      watchlistMangas
    }
  }
`;

// Friend Request & Friendlist Mutations

export const sendFriendRequestM = gql`
  mutation sendFriendRequest($username: String) {
    sendFriendRequest(request: { username: $username }) {
      incomingUserId
    }
  }
`;
export const acceptFriendRequestM = gql`
  mutation acceptFriendRequest($accept: Boolean, $id: String) {
    acceptFriendRequest(accept: { accept: $accept, id: $id }) {
      user {
        username
      }
      friends
    }
  }
`;

export const deleteFriendM = gql`
  mutation deleteFriend($id: ID!) {
    deleteFriend(id: $id)
  }
`;

// News

export const createNewsM = gql`
  mutation createNews($title: String, $text: String) {
    createNews(news: { title: $title, text: $text }) {
      title
      text
      date
    }
  }
`;
