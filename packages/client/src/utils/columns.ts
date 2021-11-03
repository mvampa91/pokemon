import { ReactNode } from "react"

interface ColumnsInput {
  nameRenderer?: RendererType,
  typesRenderer?: RendererType,
  classificationRenderer?: RendererType
}

type RendererType = (text: string[]) => ReactNode;

export const columns = ({
  nameRenderer,
  typesRenderer,
  classificationRenderer
}: ColumnsInput) => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: nameRenderer,
    },
    {
      title: "Type",
      dataIndex: "types",
      key: "types",
      render: typesRenderer,
    },
    {
      title: "Classification",
      dataIndex: "classification",
      key: "classification",
      render: classificationRenderer
    },
  ];