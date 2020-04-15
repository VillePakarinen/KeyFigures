import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, StylesProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import I18nProvider from "./i18n/I18nProvider";
import { LOCALES } from "./i18n/locales";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import theme from "./style/theme";
import { KeyFigureServiceProvider } from "./services/KeyFigureServiceProvider";
import KeyFigurePage from "./pages/KeyFigurePage";
import QueryProvider from "./services/QueryProvider";

interface Props {
  language?: string;
}

const App = (props: Props) => {
  const locale = props.language ? props.language : LOCALES.FINNISH;

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <ErrorBoundary render={<h1>Oops something went wrong</h1>}>
          <I18nProvider locale={locale}>
            <QueryProvider>
              <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <div className="App">
                  <KeyFigureServiceProvider>
                    <KeyFigurePage />
                  </KeyFigureServiceProvider>
                </div>
              </SnackbarProvider>
            </QueryProvider>
          </I18nProvider>
        </ErrorBoundary>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
