import { gql } from "@apollo/client";

export const GET_POKEMONS_BY_NAME = gql`
  query GetPokemons($name: String, $cursor: ID, $limit: Int) {
    pokemons(after: $cursor, limit: $limit, q: $name) {
      edges {
        cursor
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
          endCursor
          hasNextPage
      }
    }
  }
`;

export const GET_POKEMONS_BY_TYPE = gql`
  query GetPokemonsByType($type: String!, $cursor: ID, $limit: Int) {
    pokemonsByType(after: $cursor, limit: $limit, type: $type) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
          endCursor
          hasNextPage
      }
    }
  }
`;