import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

export const useFetchPokemons = (query: DocumentNode, variables: { [key: string]: any }) => {
    const { loading, data } = useQuery(
        query,
        {
          variables,
        }
      );

      return {
          loading,
          data: data?.[variables.key]
      }
}
