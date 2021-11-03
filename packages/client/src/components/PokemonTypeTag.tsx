import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import { getTypeColor } from "../utils/pokemonUtils";
const { CheckableTag } = Tag;

const PokemonTypeTag: React.FC<{
  types: string[];
  checkable?: boolean;
  onChange?: (checked: boolean, t: string) => void;
  value?: string;
}> = ({ types, checkable, onChange = () => {}, value }) => {
  const [checkedTag, setCheckedTag] = useState("");

  const handleChange = (checked: boolean, t: string) => {
    if (checked) {
      setCheckedTag(t);
    } else {
      setCheckedTag("");
    }
    onChange(checked, t);
  };

  useEffect(() => {
    if (value !== undefined) setCheckedTag(value);
  }, [value]);

  const TagComponent = checkable ? CheckableTag : Tag;
  return (
    <>
      {types.map((t, index) => (
        <TagComponent
          checked={checkedTag === t}
          key={index}
          color={getTypeColor(t)}
          onChange={(checked) => handleChange(checked as boolean, t)}
        >
          {t}
        </TagComponent>
      ))}
    </>
  );
};

export default PokemonTypeTag;
