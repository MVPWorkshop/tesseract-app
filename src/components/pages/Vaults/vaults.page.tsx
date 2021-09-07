import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { Trans } from "@lingui/macro";
import { useDispatch } from "react-redux";
import { ESupportedLocales } from "../../../shared/types/locale.types";
import { changeLocale } from "../../../redux/ui/ui.redux.actions";

const VaultsPage: React.FC = () => {

  const dispatch = useDispatch();

  const changeLang = (lang: ESupportedLocales) => () => {
    dispatch(changeLocale(lang));
  };

  return (
    <PageOrganism>
      <button onClick={changeLang(ESupportedLocales.ENGLISH)}>change to en</button>
      <button onClick={changeLang(ESupportedLocales.INTERSLAVIC)}>change to en</button>

      <Trans>Hi!</Trans>
    </PageOrganism>
  );
};

export default VaultsPage;
