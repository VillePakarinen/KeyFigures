import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";

import strings from "./strings";
import { LOCALES } from "./locales";

interface Props {
  locale: string;
}

const I18nProvider: React.FC<Props> = ({ locale, children }) => {
  const localeProvided = Object.values(LOCALES).find((language: string) => {
    return language === locale;
  });

  if (!localeProvided) {
    const localeString = Object.values(LOCALES).join(", ");
    throw new Error(
      "Improper locale provided to the application. Try passing one of these languages to App component: " +
        localeString
    );
  }

  return (
    <IntlProvider locale={locale} key={locale} textComponent={Fragment} messages={strings[locale]}>
      {children}
    </IntlProvider>
  );
};

export default I18nProvider;
