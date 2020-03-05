import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/header/Header";
import I18nProvider from "./i18n/i18nProvider";
import { LOCALES } from "./i18n/locales";

interface Props {
  language?: string;
}

const App = (props: Props) => {
  return (
    <>
      <I18nProvider locale={props.language ? props.language : LOCALES.FINNISH}>
        <CssBaseline />
        <div className="App">
          <Header />
        </div>
      </I18nProvider>
    </>
  );
};

export default App;
