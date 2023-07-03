import React from "react";

import Modify from "./Modify";
export type Data = {
  name: string;
  color: string;
  score: number;
};
export type Config = {
  label: string;
  render: (data: Data) => React.ReactElement | number | string;
  sortValue?: (data: Data) => number | string;
  header?: () => React.ReactElement;
};
export type KeyFn = {
  keyFn: (data: Data) => string;
};
const Table = () => {
  const data = [
    {
      name: "peach",
      color: "pink",
      score: 3,
    },
    {
      name: "kiwi",
      color: "green",
      score: 1,
    },
    {
      name: "watermellon",
      color: "red",
      score: 4,
    },
  ];
  const config = [
    {
      label: "name",
      render: (fruit: Data) => fruit.name,
      sortValue: (fruit: Data) => fruit.name,
    },
    {
      label: "color",
      render: (fruit: Data) => (
        <div className={`box align ${fruit.color}`}></div>
      ),
    },
    {
      label: "score",
      render: (fruit: Data) => fruit.score,
      sortValue: (fruit: Data) => fruit.score,
    },
  ];
  const keyFn = (data: Data) => {
    return data.name;
  };
  return <Modify data={data} config={config} keyFn={keyFn} />;
};

export default Table;
