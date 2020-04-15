import React from "react";
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = {
  refetchAllOnWindowFocus: false,
};

const QueryProvider: React.FC = (props) => {
  return <ReactQueryConfigProvider config={queryConfig}>{props.children}</ReactQueryConfigProvider>;
};

export default QueryProvider;
