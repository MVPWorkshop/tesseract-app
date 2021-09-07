import React, { useEffect } from "react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/redux.types";
import { ESupportedLocales } from "../../shared/types/locale.types";
import { en, ia }  from "make-plural/plurals";

const WithLingui: React.FC = (props) => {

  const selectedLocale = useSelector<RootState, ESupportedLocales>(state => state.ui.locale);

  const plurals = {
    [ESupportedLocales.ENGLISH]: en,
    [ESupportedLocales.INTERSLAVIC]: ia
  };

  useEffect(() => {
    const loadDynamically = async () => {
      const { messages } = await import(`../../locales/${selectedLocale}/messages.js`);

      i18n.loadLocaleData(selectedLocale, { plurals: () => plurals[selectedLocale] });
      i18n.load(selectedLocale, messages);
      i18n.activate(selectedLocale);
    };

    loadDynamically().then().catch();
  }, [selectedLocale]);

  return (
    <I18nProvider i18n={i18n}>
      {props.children}
    </I18nProvider>
  );
};

export default WithLingui;
