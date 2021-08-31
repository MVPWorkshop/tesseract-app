import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { Trans } from "@lingui/macro";
import { useDispatch } from "react-redux";
import { ESupportedLocales } from "../../../shared/types/locale.types";
import { changeLocale } from "../../../redux/ui/ui.redux.actions";
import { useWeb3React } from "@web3-react/core";
import ContractFactory from "../../../shared/contracts/contract.factory";
import { EContractType } from "../../../shared/types/contract.types";
import { Web3Provider } from "@ethersproject/providers";

const VaultsPage: React.FC = () => {

  const dispatch = useDispatch();
  const { library, account } = useWeb3React<Web3Provider>();

  const changeLang = (lang: ESupportedLocales) => () => {
    dispatch(changeLocale(lang));
  };

  const setDepositLimit = async () => {
    if (library && account) {
      // @TODO Implement Registry contract and get addresses from there
      const contractInstance = new ContractFactory(EContractType.VAULT).createContract(
        "0xf135af4294a1ca7ad7de0260033418de2cf20696",
        library.getSigner(account).connectUnchecked()
      );

      await contractInstance.setDepositLimit("100");
    }
  };

  return (
    <PageOrganism>
      <button onClick={changeLang(ESupportedLocales.ENGLISH)}>change to en</button>
      <button onClick={changeLang(ESupportedLocales.INTERSLAVIC)}>change to en</button>
      <button onClick={setDepositLimit}>Tryout contract</button>
      <Trans>Hi!</Trans>
    </PageOrganism>
  );
};

export default VaultsPage;
