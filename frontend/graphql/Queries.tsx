import { gql } from '@apollo/client';

// User Queries

export const getProfileQ = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      user {
        id
        username
        date
        isAdmin
        lastTimeOnline
        isOnline
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
        id
        username
        date
        isAdmin
        lastTimeOnline
        isOnline
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
        id
        username
        date
        isAdmin
        lastTimeOnline
        isOnline
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
      date
      lastTimeOnline
      isOnline
    }
  }
`;

export const getCurrentUserQ = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
      date
      isAdmin
      lastTimeOnline
      isOnline
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
`;

export const getListQ = gql`
  query getList($id: ID!) {
    getList(id: $id) {
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
`;

export const getListsQ = gql`
  query getLists {
    getLists {
      user {
        id
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
`;

// Friendlist Queries

export const getFriendListQ = gql`
  query getFriendList {
    getFriendList {
      id
      username
      userprofile {
        id
      }
    }
  }
`;

// News
export const getNewsQ = gql`
  query getNews {
    getNews {
      title
      text
      date
    }
  }
`;
