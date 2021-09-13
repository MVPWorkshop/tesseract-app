import {
  ethers,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "../../types/contract.types";

interface RegistryAbiInterface extends ethers.utils.Interface {
  functions: {
    "setGovernance(address)": FunctionFragment;
    "acceptGovernance()": FunctionFragment;
    "latestRelease()": FunctionFragment;
    "latestVault(address)": FunctionFragment;
    "newRelease(address)": FunctionFragment;
    "newVault(address,address,address,string,string)": FunctionFragment;
    "newExperimentalVault(address,address,address,address,string,string)": FunctionFragment;
    "endorseVault(address)": FunctionFragment;
    "setBanksy(address)": FunctionFragment;
    "tagVault(address,string)": FunctionFragment;
    "numReleases()": FunctionFragment;
    "releases(uint256)": FunctionFragment;
    "numVaults(address)": FunctionFragment;
    "vaults(address,uint256)": FunctionFragment;
    "tokens(uint256)": FunctionFragment;
    "numTokens()": FunctionFragment;
    "isRegistered(address)": FunctionFragment;
    "governance()": FunctionFragment;
    "pendingGovernance()": FunctionFragment;
    "tags(address)": FunctionFragment;
    "banksy(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "setGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "latestRelease",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "latestVault", values: [string]): string;
  encodeFunctionData(functionFragment: "newRelease", values: [string]): string;
  encodeFunctionData(
    functionFragment: "newVault",
    values: [string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "newExperimentalVault",
    values: [string, string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "endorseVault",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setBanksy", values: [string]): string;
  encodeFunctionData(
    functionFragment: "tagVault",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "numReleases",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "releases",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "numVaults", values: [string]): string;
  encodeFunctionData(
    functionFragment: "vaults",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "numTokens", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isRegistered",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "tags", values: [string]): string;
  encodeFunctionData(functionFragment: "banksy", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "setGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestRelease",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "newRelease", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "newVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "newExperimentalVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endorseVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBanksy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tagVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numReleases",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "releases", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "numVaults", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vaults", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "numTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tags", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "banksy", data: BytesLike): Result;

  events: {
    "NewRelease(uint256,address,string)": EventFragment;
    "NewVault(address,uint256,address,string)": EventFragment;
    "NewExperimentalVault(address,address,address,string)": EventFragment;
    "NewGovernance(address)": EventFragment;
    "VaultTagged(address,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewRelease"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewVault"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewExperimentalVault"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewGovernance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VaultTagged"): EventFragment;
}

export class RegistryAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RegistryAbiInterface;

  functions: {
    setGovernance(
      governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    latestRelease(overrides?: CallOverrides): Promise<[string]>;

    latestVault(token: string, overrides?: CallOverrides): Promise<[string]>;

    newRelease(
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "newVault(address,address,address,string,string)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "newVault(address,address,address,string,string,uint256)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "newExperimentalVault(address,address,address,address,string,string)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "newExperimentalVault(address,address,address,address,string,string,uint256)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "endorseVault(address)"(
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "endorseVault(address,uint256)"(
      vault: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setBanksy(address)"(
      tagger: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setBanksy(address,bool)"(
      tagger: string,
      allowed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tagVault(
      vault: string,
      tag: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    numReleases(overrides?: CallOverrides): Promise<[BigNumber]>;

    releases(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    numVaults(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    vaults(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    numTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    isRegistered(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    governance(overrides?: CallOverrides): Promise<[string]>;

    pendingGovernance(overrides?: CallOverrides): Promise<[string]>;

    tags(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    banksy(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
  };

  setGovernance(
    governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  acceptGovernance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  latestRelease(overrides?: CallOverrides): Promise<string>;

  latestVault(token: string, overrides?: CallOverrides): Promise<string>;

  newRelease(
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "newVault(address,address,address,string,string)"(
    token: string,
    guardian: string,
    rewards: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "newVault(address,address,address,string,string,uint256)"(
    token: string,
    guardian: string,
    rewards: string,
    name: string,
    symbol: string,
    releaseDelta: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "newExperimentalVault(address,address,address,address,string,string)"(
    token: string,
    governance: string,
    guardian: string,
    rewards: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "newExperimentalVault(address,address,address,address,string,string,uint256)"(
    token: string,
    governance: string,
    guardian: string,
    rewards: string,
    name: string,
    symbol: string,
    releaseDelta: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "endorseVault(address)"(
    vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "endorseVault(address,uint256)"(
    vault: string,
    releaseDelta: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setBanksy(address)"(
    tagger: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setBanksy(address,bool)"(
    tagger: string,
    allowed: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tagVault(
    vault: string,
    tag: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  numReleases(overrides?: CallOverrides): Promise<BigNumber>;

  releases(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  numVaults(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  vaults(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  tokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  numTokens(overrides?: CallOverrides): Promise<BigNumber>;

  isRegistered(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  governance(overrides?: CallOverrides): Promise<string>;

  pendingGovernance(overrides?: CallOverrides): Promise<string>;

  tags(arg0: string, overrides?: CallOverrides): Promise<string>;

  banksy(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    setGovernance(governance: string, overrides?: CallOverrides): Promise<void>;

    acceptGovernance(overrides?: CallOverrides): Promise<void>;

    latestRelease(overrides?: CallOverrides): Promise<string>;

    latestVault(token: string, overrides?: CallOverrides): Promise<string>;

    newRelease(vault: string, overrides?: CallOverrides): Promise<void>;

    "newVault(address,address,address,string,string)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "newVault(address,address,address,string,string,uint256)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "newExperimentalVault(address,address,address,address,string,string)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "newExperimentalVault(address,address,address,address,string,string,uint256)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "endorseVault(address)"(
      vault: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "endorseVault(address,uint256)"(
      vault: string,
      releaseDelta: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setBanksy(address)"(
      tagger: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setBanksy(address,bool)"(
      tagger: string,
      allowed: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    tagVault(
      vault: string,
      tag: string,
      overrides?: CallOverrides
    ): Promise<void>;

    numReleases(overrides?: CallOverrides): Promise<BigNumber>;

    releases(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    numVaults(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    vaults(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    numTokens(overrides?: CallOverrides): Promise<BigNumber>;

    isRegistered(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    governance(overrides?: CallOverrides): Promise<string>;

    pendingGovernance(overrides?: CallOverrides): Promise<string>;

    tags(arg0: string, overrides?: CallOverrides): Promise<string>;

    banksy(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    NewRelease(
      release_id?: BigNumberish | null,
      template?: null,
      api_version?: null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { release_id: BigNumber; template: string; api_version: string }
      >;

    NewVault(
      token?: string | null,
      vault_id?: BigNumberish | null,
      vault?: null,
      api_version?: null
    ): TypedEventFilter<
      [string, BigNumber, string, string],
      { token: string; vault_id: BigNumber; vault: string; api_version: string }
      >;

    NewExperimentalVault(
      token?: string | null,
      deployer?: string | null,
      vault?: null,
      api_version?: null
    ): TypedEventFilter<
      [string, string, string, string],
      { token: string; deployer: string; vault: string; api_version: string }
      >;

    NewGovernance(
      governance?: null
    ): TypedEventFilter<[string], { governance: string }>;

    VaultTagged(
      vault?: null,
      tag?: null
    ): TypedEventFilter<[string, string], { vault: string; tag: string }>;
  };

  estimateGas: {
    setGovernance(
      governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    latestRelease(overrides?: CallOverrides): Promise<BigNumber>;

    latestVault(token: string, overrides?: CallOverrides): Promise<BigNumber>;

    newRelease(
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "newVault(address,address,address,string,string)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "newVault(address,address,address,string,string,uint256)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "newExperimentalVault(address,address,address,address,string,string)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "newExperimentalVault(address,address,address,address,string,string,uint256)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "endorseVault(address)"(
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "endorseVault(address,uint256)"(
      vault: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setBanksy(address)"(
      tagger: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setBanksy(address,bool)"(
      tagger: string,
      allowed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tagVault(
      vault: string,
      tag: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    numReleases(overrides?: CallOverrides): Promise<BigNumber>;

    releases(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    numVaults(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    vaults(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    numTokens(overrides?: CallOverrides): Promise<BigNumber>;

    isRegistered(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<BigNumber>;

    pendingGovernance(overrides?: CallOverrides): Promise<BigNumber>;

    tags(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    banksy(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    setGovernance(
      governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    latestRelease(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    latestVault(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    newRelease(
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "newVault(address,address,address,string,string)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "newVault(address,address,address,string,string,uint256)"(
      token: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "newExperimentalVault(address,address,address,address,string,string)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "newExperimentalVault(address,address,address,address,string,string,uint256)"(
      token: string,
      governance: string,
      guardian: string,
      rewards: string,
      name: string,
      symbol: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "endorseVault(address)"(
      vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "endorseVault(address,uint256)"(
      vault: string,
      releaseDelta: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setBanksy(address)"(
      tagger: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setBanksy(address,bool)"(
      tagger: string,
      allowed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tagVault(
      vault: string,
      tag: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    numReleases(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    releases(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numVaults(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vaults(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isRegistered(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingGovernance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tags(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    banksy(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
