import React from "react";
import { DisplayProps } from "./Display";
import Display from "./Display";
import { useState } from "react";
const Modify = (props: DisplayProps) => {
  const { data, config } = props;
  const [sortOrder, setSortOrder] = useState<null | string>(null);
  const [sortBy, setSortBy] = useState<null | string>(null);
  const changeCycle = (label: string) => {
    if (sortBy && sortBy !== label) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };
  const getIcons = (
    label: string,
    sortOrder: string | null,
    sortBy: string | null
  ) => {
    if (sortBy !== label) {
      return "both icons";
    }
    if (sortOrder === null) {
      return "both icons";
    } else if (sortOrder === "asc") {
      return "up icon";
    } else if (sortOrder === "desc") {
      return "down icon";
    }
  };
  const modifiedConfig = config.map((configItem) => {
    if (configItem.sortValue) {
      return {
        ...configItem,
        header: () => (
          <th onClick={() => changeCycle(configItem.label)}>
            {configItem.label}
            {getIcons(configItem.label, sortOrder, sortBy)}
          </th>
        ),
      };
    } else {
      return configItem;
    }
  });

  let modifiedData = [...data];
  if (sortBy && sortOrder) {
    const { sortValue } = config.find((item) => item.label === sortBy)!;
    modifiedData = modifiedData.sort((a, b) => {
      const valueA = sortValue?.(a);
      const valueB = sortValue?.(b);
      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * reverseOrder;
      }
      return 0;
    });
  }
  return <Display {...props} data={modifiedData} config={modifiedConfig} />;
};

export default Modify;
