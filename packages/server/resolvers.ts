import { IResolvers } from "graphql-tools";
import * as pokemons from "./models/pokemons";
import * as pokemonsByType from "./models/pokemonsByType";

export const resolvers: IResolvers = {
  Query: {
    pokemons: (_source, args) => pokemons.query(args),
    pokemonsByType: (_source, args) => pokemonsByType.query(args)
  }
};