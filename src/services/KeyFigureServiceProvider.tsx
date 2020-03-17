import React, { createContext, useContext, useMemo } from "react";
import { KeyFigureService } from "./KeyFigureService";

const KeyFigureServiceContext = createContext<KeyFigureService>(new KeyFigureService());

export const useKeyFigureService = () => {
  const store = useContext(KeyFigureServiceContext);
  if (!store) {
    throw new Error("Cannot use useKeyFigureService oitside of a provider");
  }
  return store;
};

export const KeyFigureServiceProvider = (props: any) => {
  const keyFigureService = useMemo(() => new KeyFigureService(), []);
  return <KeyFigureServiceContext.Provider value={keyFigureService} {...props} />;
};
