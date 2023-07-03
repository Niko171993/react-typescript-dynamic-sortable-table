import React, { Fragment } from "react";
import { Data, Config, KeyFn } from "./Table";

export type DisplayProps = {
  config: Config[];
  data: Data[];
} & KeyFn;
const Display = ({ data, config, keyFn }: DisplayProps) => {
  const renderedConfig = config.map((configItem) => {
    if (configItem.header) {
      return <Fragment key={configItem.label}>{configItem.header()}</Fragment>;
    } else {
      return <th key={configItem.label}>{configItem.label}</th>;
    }
  });
  const renderedData = data.map((dataItem) => {
    const renderedCells = config.map((configItem, index) => {
      return (
        <td
          key={configItem.label}
          className={`${
            index === 1
              ? "test"
              : index === 2
              ? "center"
              : index === 0
              ? "center"
              : null
          }`}
        >
          {configItem.render(dataItem)}
        </td>
      );
    });

    return <tr key={keyFn(dataItem)}>{renderedCells}</tr>;
  });
  return (
    <div>
      <table className="table">
        <thead className="head">
          <tr>{renderedConfig}</tr>
        </thead>
        <tbody className="body">{renderedData}</tbody>
      </table>
    </div>
  );
};

export default Display;
