import { gql } from "@apollo/client";

export const GET_POKEMONS_BY_NAME = gql`
  query GetPokemons($name: String, $cursor: ID, $limit: Int) {
    pokemons(after: $cursor, limit: $limit, q: $name) {
      edges {
        cursor
        node {
          id,
          name,
          types,
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
  query GetPokemonsByType($type: String!) {
    pokemonsByType(limit: 10, type: $type) {
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