import React, { createContext, useContext, useMemo } from "react";
import { KeyFigureService } from "./KeyFigureService";
import { useIntl } from "react-intl";

const KeyFigureServiceContext = createContext<KeyFigureService | undefined>(undefined);

export const useKeyFigureService = () => {
  const store = useContext(KeyFigureServiceContext);
  if (!store) {
    throw new Error("Cannot use useKeyFigureService oitside of a provider");
  }
  return store;
};

export const KeyFigureServiceProvider = (props: any) => {
  const intl = useIntl();
  const keyFigureService = useMemo(() => new KeyFigureService(intl), [intl]);
  return <KeyFigureServiceContext.Provider value={keyFigureService} {...props} />;
};
