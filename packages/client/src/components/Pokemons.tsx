import React, { ChangeEvent, useEffect, useMemo, useReducer } from "react";
import { Table, Input, Button } from "antd";
import "antd/dist/antd.css";

import { pokemonTypes } from "../utils/pokemonUtils";
import PokemonTypeTag from "./PokemonTypeTag";
import { columns } from "../utils/columns";
import { reducer, initialState } from "./reducer";
import { useFetchPokemons } from "../utils/useFetchPokemons";

const { Search } = Input;

const tableStructure = columns({
  typesRenderer: (text: string[]) => <PokemonTypeTag types={text} />,
});

export const Pokemons: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: "search", payload: event.currentTarget.value });
  };

  const handleTypeChange = (checked: boolean, filter: string) => {
    let newFilter = "";
    if (checked) {
      newFilter = filter;
    }
    dispatch({ type: "filter", payload: newFilter });
  };

  const params = useMemo(
    () =>
      Object.entries(state.params).reduce(
        (acc: { [key: string]: any }, n: any[]) => {
          acc[n[0]] = state[n[1]];
          return acc;
        },
        {}
      ),
    [state.params]
  );

  const { loading, data } = useFetchPokemons(state.call, {
    ...params,
    key: state.key,
  });

  useEffect(() => {
    dispatch({
      type: "loading",
      payload: loading,
    });
  }, [loading]);

  useEffect(() => {
    dispatch({ type: "save", payload: data });
  }, [data]);

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
      {state.hasNextPage ? (
        <Button
          type="primary"
          loading={state.loading}
          onClick={() =>
            dispatch({ type: "load_more", payload: state.endCursor })
          }
        >
          Load more Pokemons
        </Button>
      ) : null}
    </>
  );
};
