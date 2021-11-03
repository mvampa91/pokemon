import { Reducer } from "react";
import { Edge, Pokemon, PokemonState, Action } from "../types";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from "../queries";

export const reducer: Reducer<any, any> = (state: PokemonState, action: Action) => {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          loading: action.payload,
        };
      case "search":
        return {
          ...state,
          query: action.payload,
          pokemons: [],
          cursor: "000",
          filter: "",
          hasNextPage: false,
          call: GET_POKEMONS_BY_NAME,
          key: "pokemons",
          params: {
            name: 'query',
            cursor: 'cursor'
          },
        };
      case "filter":
        return {
          ...state,
          filter: action.payload,
          pokemons: [],
          cursor: "000",
          query: "",
          hasNextPage: false,
          call: action.payload ? GET_POKEMONS_BY_TYPE : initialState.call,
          key: action.payload ? "pokemonsByType" : initialState.key,
          params: {
            type: 'filter',
            cursor: 'cursor'
          }
        };
      case "load_more":
        return {
          ...state,
          cursor: action.payload,
          params: {
              ...state.params,
              cursor: 'cursor'
          },
        };
      case "save":
        return {
          ...state,
          pokemons: state.pokemons?.concat(
            action.payload?.edges?.map((edge: Edge<Pokemon>) => ({
              key: edge.node.id,
              name: edge.node.name,
              types: edge.node.types,
              classification: edge.node.classification,
            })) || []
          ),
          endCursor: action.payload?.pageInfo?.endCursor,
          hasNextPage: action.payload?.pageInfo?.hasNextPage
        };
  
      default:
        throw new Error();
    }
  };

  export const initialState: PokemonState = {
    query: "",
    pokemons: [],
    cursor: "",
    filter: "",
    loading: false,
    endCursor: "",
    hasNextPage: false,
    call: GET_POKEMONS_BY_NAME,
    key: "pokemons",
    params: {}
  };