import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
;

export const GET_REPOSITORY = gql
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
    }
  }
;

export const GET_ME = gql
  query GetMe {
    me {
      id
      username
    }
  }
;
