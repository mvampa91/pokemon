import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Table, Tag, Input, Button } from "antd";
import { useQuery } from "@apollo/client";
import "antd/dist/antd.css";

import getTypeColor, { pokemonTypes } from "../utils/pokemonUtils";
import { Edge, Pokemon } from "../types";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from "../queries";

const { Search } = Input;
const { CheckableTag } = Tag;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "types",
    key: "types",
    render: (text: string[]) => (
      <>
        {text.map((t, index) => (
          <Tag key={index} color={getTypeColor(t)}>
            {t}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
  },
];

export const Pokemons: React.FC<{}> = () => {
  const [query, setQuery] = useState<String>();
  const [cursor, setCursor] = useState<String>();
  const [currentFilter, setCurrentFilter] = useState<String>("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const endCursor = useRef();
  const hasNextPage = useRef<Boolean>();

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value);
    setPokemons([]);
    setCursor("000");
    setCurrentFilter("");
    hasNextPage.current = false;
  };

  const handleLoadMore = () => {
    setCursor(endCursor.current);
  };

  const handleTypeChange = (checked: boolean, filter: string) => {
    if (checked) {
      setCurrentFilter(filter);
    } else {
      setCurrentFilter("");
    }
    setPokemons([]);
    setCursor("000");
    hasNextPage.current = false;
  };

  const { loading: pokemonsLoading, data: pokemonsData } = useQuery(
    GET_POKEMONS_BY_NAME,
    {
      variables: {
        name: query,
        cursor,
      },
    }
  );

  const { loading: pokemonsByTypeLoading, data: pokemonsByTypeData } = useQuery(
    GET_POKEMONS_BY_TYPE,
    {
      variables: {
        type: currentFilter,
        cursor,
      },
    }
  );

  useEffect(() => {
    if (!currentFilter) {
      setPokemons(
        pokemons.concat(
          pokemonsData?.pokemons?.edges?.map((edge: Edge<Pokemon>) => ({
            key: edge.node.id,
            name: edge.node.name,
            types: edge.node.types,
            classification: edge.node.classification,
          })) || []
        )
      );
      endCursor.current = pokemonsData?.pokemons?.pageInfo?.endCursor;
      hasNextPage.current = pokemonsData?.pokemons?.pageInfo?.hasNextPage;
    }
  }, [pokemonsData, currentFilter]);

  useEffect(() => {
    if (currentFilter) {
      setPokemons(
        pokemons.concat(
          pokemonsByTypeData?.pokemonsByType?.edges?.map(
            (edge: Edge<Pokemon>) => ({
              key: edge.node.id,
              name: edge.node.name,
              types: edge.node.types,
              classification: edge.node.classification,
            })
          ) || []
        )
      );
      endCursor.current =
        pokemonsByTypeData?.pokemonsByType?.pageInfo?.endCursor;
      hasNextPage.current =
        pokemonsByTypeData?.pokemonsByType?.pageInfo?.hasNextPage;
    }
  }, [pokemonsByTypeData, currentFilter]);

  const typesFilterRenderer = () => {
    return Object.keys(pokemonTypes).map((pt) => (
      <CheckableTag
        key={pt}
        checked={currentFilter === pt}
        onChange={(checked) => handleTypeChange(checked, pt)}
      >
        {pt}
      </CheckableTag>
    ));
  };

  return (
    <>
      <Search
        placeholder="Search a Pokemon by Name"
        allowClear
        enterButton
        size="large"
        onChange={handleOnSearch}
      />
      <div style={{ padding: 8 }}>
        <span style={{ marginRight: 8 }}>Filter by Type:</span>
        {typesFilterRenderer()}
      </div>
      <Table
        columns={columns}
        dataSource={pokemons}
        loading={pokemonsLoading || pokemonsByTypeLoading}
        pagination={false}
      />
      {hasNextPage.current ? (
        <Button
          type="primary"
          loading={pokemonsLoading || pokemonsByTypeLoading}
          onClick={handleLoadMore}
        >
          Load more Pokemons
        </Button>
      ) : null}
    </>
  );
};
