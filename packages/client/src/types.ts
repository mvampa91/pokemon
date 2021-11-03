import { DocumentNode } from "graphql";

export interface Pokemon {
    id: string;
    name: string;
    types: string[];
    classification: string;
}

export interface Edge<A> {
    node: A;
}

export interface PokemonState {
    query: string;
    pokemons: Pokemon[];
    cursor: string;
    filter: string;
    loading: boolean;
    endCursor: string;
    hasNextPage: boolean;
    call: DocumentNode;
    key: string;
    params: {};
  };

export type Action = { type: string; payload: any };