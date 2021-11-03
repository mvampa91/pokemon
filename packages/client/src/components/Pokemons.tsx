import React, { ChangeEvent, useEffect, useRef, useReducer } from "react";
import { Table, Input, Button } from "antd";
import "antd/dist/antd.css";

import { pokemonTypes } from "../utils/pokemonUtils";
import PokemonTypeTag from "./PokemonTypeTag";
import { columns } from "../utils/columns";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from "../queries";
import { reducer, initialState } from "./reducer";

const { Search } = Input;

const tableStructure = columns({
  typesRenderer: (text: string[]) => <PokemonTypeTag types={text} />,
});

export const Pokemons: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const endCursor = useRef("");
  const hasNextPage = useRef<Boolean>();

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: "search", payload: event.currentTarget.value });

    hasNextPage.current = false;
  };

  const handleTypeChange = (checked: boolean, filter: string) => {
    let newFilter = "";
    if (checked) {
      newFilter = filter;
    }
    dispatch({ type: "filter", payload: newFilter });
    hasNextPage.current = false;
  };

  const { loading: pokemonsLoading, data: pokemonsData } = useQuery(
    GET_POKEMONS_BY_NAME,
    {
      variables: {
        name: state.query,
        cursor: state.cursor,
      },
    }
  );

  const { loading: pokemonsByTypeLoading, data: pokemonsByTypeData } = useQuery(
    GET_POKEMONS_BY_TYPE,
    {
      variables: {
        type: state.filter,
        cursor: state.cursor,
      },
    }
  );

  useEffect(() => {
    dispatch({
      type: "loading",
      payload: pokemonsLoading || pokemonsByTypeLoading,
    });
  }, [pokemonsLoading, pokemonsByTypeLoading]);

  useEffect(() => {
    if (!state.filter) {
      dispatch({ type: "save", payload: pokemonsData?.pokemons });

      const { endCursor: next, hasNextPage: more } =
        pokemonsData?.pokemons?.pageInfo || {};

      endCursor.current = next;
      hasNextPage.current = more;
    }
  }, [pokemonsData, state.filter]);

  useEffect(() => {
    if (state.filter) {
      dispatch({ type: "save", payload: pokemonsByTypeData?.pokemonsByType });

      const { endCursor: next, hasNextPage: more } =
        pokemonsByTypeData?.pokemonsByType?.pageInfo || {};

      endCursor.current = next;
      hasNextPage.current = more;
    }
  }, [pokemonsByTypeData, state.filter]);

  return (
    <>
      <Search
        placeholder="Search a Pokemon by Name"
        allowClear
        enterButton
        size="large"
        onChange={handleOnSearch}
        value={state.query}
      />
      <div style={{ padding: 8 }}>
        <span style={{ marginRight: 8 }}>Filter by Type:</span>
        <PokemonTypeTag
          checkable
          types={Object.keys(pokemonTypes)}
          onChange={handleTypeChange}
          value={state.filter}
        />
      </div>
      <Table
        columns={tableStructure}
        dataSource={state.pokemons}
        loading={state.loading}
        pagination={false}
      />
      {hasNextPage.current ? (
        <Button
          type="primary"
          loading={state.loading}
          onClick={() =>
            dispatch({ type: "load_more", payload: endCursor.current })
          }
        >
          Load more Pokemons
        </Button>
      ) : null}
    </>
  );
};
