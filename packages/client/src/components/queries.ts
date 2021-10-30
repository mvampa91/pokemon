import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($name: String!) {
    pokemons(limit: 10, q: $name) {
      edges {
        node {
          id
          name
          types
        }
      }
      pageInfo {
          hasNextPage
      }
    }
  }
`;