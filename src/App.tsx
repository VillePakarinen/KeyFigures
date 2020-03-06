import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/header/Header";
import I18nProvider from "./i18n/I18nProvider";
import { LOCALES } from "./i18n/locales";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

interface Props {
  language?: string;
}

const App = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary render={<h1>Oops something went wrong</h1>}>
        <I18nProvider
          locale={props.language ? props.language : LOCALES.FINNISH}
        >
          <CssBaseline />
          <div className="App">
            <Header />
          </div>
        </I18nProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
