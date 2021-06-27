import { gql } from "@apollo/client";

// User Queries

export const getProfileQ = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      user {
        username
      }
      id
      description
      color
      favoriteAnime
      favoriteManga
      favoriteChar
    }
  }
`;

export const getProfilesQ = gql`
  query {
    getUserProfiles {
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

export const getCurrentUserProfileQ = gql`
  query getCurrentUserProfile {
    getCurrentUserProfile {
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

export const getUsersQ = gql`
  query {
    getUsers {
      id
      username
      password
    }
  }
`;

export const getCurrentUserQ = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
      userprofile {
        id
      }
    }
  }
`;

export const getCurrentListQ = gql`
  query getCurrentList {
    getCurrentList {
      id
      user {
        username
      }

      finishedAnimes
      watchingAnimes
      watchlistAnimes

      finishedMangas
      watchingMangas
      watchlistMangas
    }
  }
`