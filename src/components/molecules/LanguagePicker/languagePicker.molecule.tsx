import React from "react";
import { supportedLocaleList } from "../../../shared/constants/common.constants";
import DropdownMenu from "../DropdownMenu/dropdownMenu.molecule";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/redux.types";
import { ESupportedLocales } from "../../../shared/types/locale.types";
import { changeLocale } from "../../../redux/ui/ui.redux.actions";

const LanguagePicker: React.FC = () => {

  const currentLocale = useSelector<RootState, ESupportedLocales>((rootState) => rootState.ui.locale);
  const dispatch = useDispatch();

  const onLocaleChange = (locale: string) => {
    dispatch(changeLocale(locale as ESupportedLocales));
  };

  return (
    <DropdownMenu
      selected={currentLocale}
      items={supportedLocaleList}
      onSelect={onLocaleChange}
    />
  )
}

export default LanguagePicker;
