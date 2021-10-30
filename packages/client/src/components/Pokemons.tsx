import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Table, Tag, Input, Button } from "antd";
import { useQuery } from "@apollo/client";
import "antd/dist/antd.css";

import { Edge, Pokemon } from "../ducks/types";
import getTypeColor from "../ducks/colors";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from "../ducks/queries";

const { Search } = Input;

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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value);
    setPokemons([]);
    setCursor("000");
  };

  const handleLoadMore = (event: MouseEvent<HTMLElement>) => {
    setCursor(endCursor);
  };

  const { loading, data } = useQuery(GET_POKEMONS_BY_NAME, {
    variables: {
      name: query,
      cursor,
    },
  });

  useEffect(() => {
    setPokemons(
      pokemons.concat(
        data?.pokemons?.edges?.map((edge: Edge<Pokemon>, index: number) => ({
          key: index,
          name: edge.node.name,
          types: edge.node.types,
          classification: edge.node.classification,
        })) || []
      )
    );
  }, [data]);

  const hasNextPage = data?.pokemons?.pageInfo?.hasNextPage;
  const endCursor = data?.pokemons?.pageInfo?.endCursor;

  return (
    <>
      <Search
        placeholder="Search a Pokemon by Name"
        allowClear
        enterButton
        size="large"
        onChange={handleOnChange}
      />
      <Table
        columns={columns}
        dataSource={pokemons}
        loading={loading}
        pagination={false}
      />
      {hasNextPage ? (
        <Button type="primary" loading={loading} onClick={handleLoadMore}>
          Load more Pokemons
        </Button>
      ) : null}
    </>
  );
};
