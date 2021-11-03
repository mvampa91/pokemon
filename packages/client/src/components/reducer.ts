import { Reducer } from "react";
import { Edge, Pokemon, PokemonState, Action } from "../types";

export const reducer: Reducer<any, any> = (state: PokemonState, action: Action) => {
    console.log(action);
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
        };
      case "filter":
        return {
          ...state,
          filter: action.payload,
          pokemons: [],
          cursor: "000",
          query: ""
        };
      case "load_more":
        return {
          ...state,
          cursor: action.payload,
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
  };