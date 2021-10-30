import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Edge, Pokemon } from "./types";
import { GET_POKEMONS } from "./queries";
import "antd/dist/antd.css";
import { Table, Tag, Input } from "antd";

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
          <Tag key={index}>{t}</Tag>
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
  const [name, setName] = useState("");
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { name },
  });

  const onSearch = (value: string) => {
    setName(value);
  };

  if (error) return <p>Error :(</p>;

  const list: Edge<Pokemon>[] | undefined =
    data?.pokemons?.edges?.map((edge: Edge<Pokemon>, index: number) => ({
      key: index,
      name: edge.node.name,
      types: edge.node.types,
      classification: edge.node.classification,
    })) || [];
  console.log(list);
  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={list} loading={loading} />
    </>
  );
};
