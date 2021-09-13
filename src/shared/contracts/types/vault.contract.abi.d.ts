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

interface VaultAbiInterface extends ethers.utils.Interface {
  functions: {
    "initialize(address,address,address,string,string)": FunctionFragment;
    "apiVersion()": FunctionFragment;
    "setName(string)": FunctionFragment;
    "setSymbol(string)": FunctionFragment;
    "setGovernance(address)": FunctionFragment;
    "acceptGovernance()": FunctionFragment;
    "setManagement(address)": FunctionFragment;
    "setRewards(address)": FunctionFragment;
    "setLockedProfitDegradation(uint256)": FunctionFragment;
    "setDepositLimit(uint256)": FunctionFragment;
    "setPerformanceFee(uint256)": FunctionFragment;
    "setManagementFee(uint256)": FunctionFragment;
    "setGuardian(address)": FunctionFragment;
    "setEmergencyShutdown(bool)": FunctionFragment;
    "setWithdrawalQueue(address[20])": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "permit(address,address,uint256,uint256,bytes)": FunctionFragment;
    "totalAssets()": FunctionFragment;
    "deposit()": FunctionFragment;
    "maxAvailableShares()": FunctionFragment;
    "withdraw()": FunctionFragment;
    "pricePerShare()": FunctionFragment;
    "addStrategy(address,uint256,uint256,uint256,uint256)": FunctionFragment;
    "updateStrategyDebtRatio(address,uint256)": FunctionFragment;
    "updateStrategyMinDebtPerHarvest(address,uint256)": FunctionFragment;
    "updateStrategyMaxDebtPerHarvest(address,uint256)": FunctionFragment;
    "updateStrategyPerformanceFee(address,uint256)": FunctionFragment;
    "setStrategyEnforceChangeLimit(address,bool)": FunctionFragment;
    "setStrategySetLimitRatio(address,uint256,uint256)": FunctionFragment;
    "setStrategyCustomCheck(address,address)": FunctionFragment;
    "migrateStrategy(address,address)": FunctionFragment;
    "revokeStrategy()": FunctionFragment;
    "addStrategyToQueue(address)": FunctionFragment;
    "removeStrategyFromQueue(address)": FunctionFragment;
    "debtOutstanding()": FunctionFragment;
    "creditAvailable()": FunctionFragment;
    "availableDepositLimit()": FunctionFragment;
    "expectedReturn()": FunctionFragment;
    "report(uint256,uint256,uint256)": FunctionFragment;
    "sweep(address)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "decimals()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "token()": FunctionFragment;
    "governance()": FunctionFragment;
    "management()": FunctionFragment;
    "guardian()": FunctionFragment;
    "strategies(address)": FunctionFragment;
    "withdrawalQueue(uint256)": FunctionFragment;
    "emergencyShutdown()": FunctionFragment;
    "depositLimit()": FunctionFragment;
    "debtRatio()": FunctionFragment;
    "totalDebt()": FunctionFragment;
    "lastReport()": FunctionFragment;
    "activation()": FunctionFragment;
    "lockedProfit()": FunctionFragment;
    "lockedProfitDegradation()": FunctionFragment;
    "rewards()": FunctionFragment;
    "managementFee()": FunctionFragment;
    "performanceFee()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "DOMAIN_SEPARATOR()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "apiVersion",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setName", values: [string]): string;
  encodeFunctionData(functionFragment: "setSymbol", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setManagement",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setRewards", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setLockedProfitDegradation",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDepositLimit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPerformanceFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setManagementFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setGuardian", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setEmergencyShutdown",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setWithdrawalQueue",
    values: [
      [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalAssets",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "maxAvailableShares",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pricePerShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addStrategy",
    values: [string, BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStrategyDebtRatio",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStrategyMinDebtPerHarvest",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStrategyMaxDebtPerHarvest",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStrategyPerformanceFee",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setStrategyEnforceChangeLimit",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setStrategySetLimitRatio",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setStrategyCustomCheck",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "migrateStrategy",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeStrategy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addStrategyToQueue",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeStrategyFromQueue",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "debtOutstanding",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "creditAvailable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "availableDepositLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "expectedReturn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "report",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "sweep", values: [string]): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "management",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "guardian", values?: undefined): string;
  encodeFunctionData(functionFragment: "strategies", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdrawalQueue",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyShutdown",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositLimit",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "debtRatio", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalDebt", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastReport",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "activation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockedProfit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockedProfitDegradation",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rewards", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "managementFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "performanceFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "apiVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSymbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setManagement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRewards", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setLockedProfitDegradation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDepositLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPerformanceFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setManagementFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGuardian",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEmergencyShutdown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWithdrawalQueue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxAvailableShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pricePerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addStrategy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStrategyDebtRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStrategyMinDebtPerHarvest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStrategyMaxDebtPerHarvest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStrategyPerformanceFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStrategyEnforceChangeLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStrategySetLimitRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStrategyCustomCheck",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "migrateStrategy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeStrategy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addStrategyToQueue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeStrategyFromQueue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "debtOutstanding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creditAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "availableDepositLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expectedReturn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "report", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sweep", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "management", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "guardian", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "strategies", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawalQueue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyShutdown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "debtRatio", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lastReport", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "activation", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lockedProfit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockedProfitDegradation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewards", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "managementFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "performanceFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;

  events: {
    "Transfer(address,address,uint256)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "StrategyAdded(address,uint256,uint256,uint256,uint256)": EventFragment;
    "StrategyReported(address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "UpdateGovernance(address)": EventFragment;
    "NewPendingGovernance(address)": EventFragment;
    "UpdateManagement(address)": EventFragment;
    "UpdateRewards(address)": EventFragment;
    "UpdateDepositLimit(uint256)": EventFragment;
    "UpdatePerformanceFee(uint256)": EventFragment;
    "UpdateManagementFee(uint256)": EventFragment;
    "UpdateGuardian(address)": EventFragment;
    "EmergencyShutdown(bool)": EventFragment;
    "UpdateWithdrawalQueue(address[20])": EventFragment;
    "StrategyUpdateDebtRatio(address,uint256)": EventFragment;
    "StrategyUpdateMinDebtPerHarvest(address,uint256)": EventFragment;
    "StrategyUpdateMaxDebtPerHarvest(address,uint256)": EventFragment;
    "StrategyUpdatePerformanceFee(address,uint256)": EventFragment;
    "StrategyMigrated(address,address)": EventFragment;
    "StrategyRevoked(address)": EventFragment;
    "StrategyRemovedFromQueue(address)": EventFragment;
    "StrategyAddedToQueue(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyReported"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateGovernance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPendingGovernance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateManagement"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateRewards"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateDepositLimit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatePerformanceFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateManagementFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateGuardian"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EmergencyShutdown"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateWithdrawalQueue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyUpdateDebtRatio"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "StrategyUpdateMinDebtPerHarvest"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "StrategyUpdateMaxDebtPerHarvest"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "StrategyUpdatePerformanceFee"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyMigrated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyRemovedFromQueue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StrategyAddedToQueue"): EventFragment;
}

export class VaultAbi extends BaseContract {
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

  interface: VaultAbiInterface;

  functions: {
    "initialize(address,address,address,string,string)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "initialize(address,address,address,string,string,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "initialize(address,address,address,string,string,address,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      management: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    apiVersion(overrides?: CallOverrides): Promise<[string]>;

    setName(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSymbol(
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGovernance(
      governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setManagement(
      management: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewards(
      rewards: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setLockedProfitDegradation(
      degradation: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDepositLimit(
      limit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPerformanceFee(
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setManagementFee(
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGuardian(
      guardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setEmergencyShutdown(
      active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWithdrawalQueue(
      queue: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transfer(
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    increaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decreaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      expiry: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalAssets(overrides?: CallOverrides): Promise<[BigNumber]>;

    "deposit()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deposit(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deposit(uint256,address)"(
      _amount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    maxAvailableShares(overrides?: CallOverrides): Promise<[BigNumber]>;

    "withdraw()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdraw(uint256)"(
      maxShares: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdraw(uint256,address)"(
      maxShares: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdraw(uint256,address,uint256)"(
      maxShares: BigNumberish,
      recipient: string,
      maxLoss: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pricePerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    "addStrategy(address,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      lossLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateStrategyDebtRatio(
      strategy: string,
      debtRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateStrategyMinDebtPerHarvest(
      strategy: string,
      minDebtPerHarvest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateStrategyMaxDebtPerHarvest(
      strategy: string,
      maxDebtPerHarvest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateStrategyPerformanceFee(
      strategy: string,
      performanceFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStrategyEnforceChangeLimit(
      strategy: string,
      enabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStrategySetLimitRatio(
      strategy: string,
      _lossRatioLimit: BigNumberish,
      _profitLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStrategyCustomCheck(
      strategy: string,
      _customCheck: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    migrateStrategy(
      oldVersion: string,
      newVersion: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "revokeStrategy()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "revokeStrategy(address)"(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addStrategyToQueue(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeStrategyFromQueue(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "debtOutstanding()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    "debtOutstanding(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "creditAvailable()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    "creditAvailable(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    availableDepositLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    "expectedReturn()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    "expectedReturn(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    report(
      gain: BigNumberish,
      loss: BigNumberish,
      _debtPayment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "sweep(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "sweep(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    decimals(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    governance(overrides?: CallOverrides): Promise<[string]>;

    management(overrides?: CallOverrides): Promise<[string]>;

    guardian(overrides?: CallOverrides): Promise<[string]>;

    strategies(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        BigNumber,
        BigNumber,
        string
      ] & {
      performanceFee: BigNumber;
      activation: BigNumber;
      debtRatio: BigNumber;
      minDebtPerHarvest: BigNumber;
      maxDebtPerHarvest: BigNumber;
      lastReport: BigNumber;
      totalDebt: BigNumber;
      totalGain: BigNumber;
      totalLoss: BigNumber;
      enforceChangeLimit: boolean;
      profitLimitRatio: BigNumber;
      lossLimitRatio: BigNumber;
      customCheck: string;
    }
      >;

    withdrawalQueue(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    emergencyShutdown(overrides?: CallOverrides): Promise<[boolean]>;

    depositLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    debtRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalDebt(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastReport(overrides?: CallOverrides): Promise<[BigNumber]>;

    activation(overrides?: CallOverrides): Promise<[BigNumber]>;

    lockedProfit(overrides?: CallOverrides): Promise<[BigNumber]>;

    lockedProfitDegradation(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewards(overrides?: CallOverrides): Promise<[string]>;

    managementFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    performanceFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
  };

  "initialize(address,address,address,string,string)"(
    token: string,
    governance: string,
    rewards: string,
    nameOverride: string,
    symbolOverride: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "initialize(address,address,address,string,string,address)"(
    token: string,
    governance: string,
    rewards: string,
    nameOverride: string,
    symbolOverride: string,
    guardian: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "initialize(address,address,address,string,string,address,address)"(
    token: string,
    governance: string,
    rewards: string,
    nameOverride: string,
    symbolOverride: string,
    guardian: string,
    management: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  apiVersion(overrides?: CallOverrides): Promise<string>;

  setName(
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSymbol(
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGovernance(
    governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  acceptGovernance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setManagement(
    management: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewards(
    rewards: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setLockedProfitDegradation(
    degradation: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDepositLimit(
    limit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPerformanceFee(
    fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setManagementFee(
    fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGuardian(
    guardian: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setEmergencyShutdown(
    active: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWithdrawalQueue(
    queue: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transfer(
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: string,
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  increaseAllowance(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decreaseAllowance(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  permit(
    owner: string,
    spender: string,
    amount: BigNumberish,
    expiry: BigNumberish,
    signature: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

  "deposit()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deposit(uint256)"(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deposit(uint256,address)"(
    _amount: BigNumberish,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  maxAvailableShares(overrides?: CallOverrides): Promise<BigNumber>;

  "withdraw()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdraw(uint256)"(
    maxShares: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdraw(uint256,address)"(
    maxShares: BigNumberish,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdraw(uint256,address,uint256)"(
    maxShares: BigNumberish,
    recipient: string,
    maxLoss: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;

  "addStrategy(address,uint256,uint256,uint256,uint256)"(
    strategy: string,
    debtRatio: BigNumberish,
    minDebtPerHarvest: BigNumberish,
    maxDebtPerHarvest: BigNumberish,
    performanceFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addStrategy(address,uint256,uint256,uint256,uint256,uint256)"(
    strategy: string,
    debtRatio: BigNumberish,
    minDebtPerHarvest: BigNumberish,
    maxDebtPerHarvest: BigNumberish,
    performanceFee: BigNumberish,
    profitLimitRatio: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addStrategy(address,uint256,uint256,uint256,uint256,uint256,uint256)"(
    strategy: string,
    debtRatio: BigNumberish,
    minDebtPerHarvest: BigNumberish,
    maxDebtPerHarvest: BigNumberish,
    performanceFee: BigNumberish,
    profitLimitRatio: BigNumberish,
    lossLimitRatio: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateStrategyDebtRatio(
    strategy: string,
    debtRatio: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateStrategyMinDebtPerHarvest(
    strategy: string,
    minDebtPerHarvest: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateStrategyMaxDebtPerHarvest(
    strategy: string,
    maxDebtPerHarvest: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateStrategyPerformanceFee(
    strategy: string,
    performanceFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStrategyEnforceChangeLimit(
    strategy: string,
    enabled: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStrategySetLimitRatio(
    strategy: string,
    _lossRatioLimit: BigNumberish,
    _profitLimitRatio: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStrategyCustomCheck(
    strategy: string,
    _customCheck: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  migrateStrategy(
    oldVersion: string,
    newVersion: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "revokeStrategy()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "revokeStrategy(address)"(
    strategy: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addStrategyToQueue(
    strategy: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeStrategyFromQueue(
    strategy: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "debtOutstanding()"(overrides?: CallOverrides): Promise<BigNumber>;

  "debtOutstanding(address)"(
    strategy: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "creditAvailable()"(overrides?: CallOverrides): Promise<BigNumber>;

  "creditAvailable(address)"(
    strategy: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  availableDepositLimit(overrides?: CallOverrides): Promise<BigNumber>;

  "expectedReturn()"(overrides?: CallOverrides): Promise<BigNumber>;

  "expectedReturn(address)"(
    strategy: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  report(
    gain: BigNumberish,
    loss: BigNumberish,
    _debtPayment: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "sweep(address)"(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "sweep(address,uint256)"(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  decimals(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  allowance(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  governance(overrides?: CallOverrides): Promise<string>;

  management(overrides?: CallOverrides): Promise<string>;

  guardian(overrides?: CallOverrides): Promise<string>;

  strategies(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean,
      BigNumber,
      BigNumber,
      string
    ] & {
    performanceFee: BigNumber;
    activation: BigNumber;
    debtRatio: BigNumber;
    minDebtPerHarvest: BigNumber;
    maxDebtPerHarvest: BigNumber;
    lastReport: BigNumber;
    totalDebt: BigNumber;
    totalGain: BigNumber;
    totalLoss: BigNumber;
    enforceChangeLimit: boolean;
    profitLimitRatio: BigNumber;
    lossLimitRatio: BigNumber;
    customCheck: string;
  }
    >;

  withdrawalQueue(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  emergencyShutdown(overrides?: CallOverrides): Promise<boolean>;

  depositLimit(overrides?: CallOverrides): Promise<BigNumber>;

  debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

  totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

  lastReport(overrides?: CallOverrides): Promise<BigNumber>;

  activation(overrides?: CallOverrides): Promise<BigNumber>;

  lockedProfit(overrides?: CallOverrides): Promise<BigNumber>;

  lockedProfitDegradation(overrides?: CallOverrides): Promise<BigNumber>;

  rewards(overrides?: CallOverrides): Promise<string>;

  managementFee(overrides?: CallOverrides): Promise<BigNumber>;

  performanceFee(overrides?: CallOverrides): Promise<BigNumber>;

  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    "initialize(address,address,address,string,string)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address,address,string,string,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address,address,string,string,address,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      management: string,
      overrides?: CallOverrides
    ): Promise<void>;

    apiVersion(overrides?: CallOverrides): Promise<string>;

    setName(name: string, overrides?: CallOverrides): Promise<void>;

    setSymbol(symbol: string, overrides?: CallOverrides): Promise<void>;

    setGovernance(governance: string, overrides?: CallOverrides): Promise<void>;

    acceptGovernance(overrides?: CallOverrides): Promise<void>;

    setManagement(management: string, overrides?: CallOverrides): Promise<void>;

    setRewards(rewards: string, overrides?: CallOverrides): Promise<void>;

    setLockedProfitDegradation(
      degradation: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setDepositLimit(
      limit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPerformanceFee(
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setManagementFee(
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setGuardian(guardian: string, overrides?: CallOverrides): Promise<void>;

    setEmergencyShutdown(
      active: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setWithdrawalQueue(
      queue: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ],
      overrides?: CallOverrides
    ): Promise<void>;

    transfer(
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    increaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    decreaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      expiry: BigNumberish,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

    "deposit()"(overrides?: CallOverrides): Promise<BigNumber>;

    "deposit(uint256)"(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "deposit(uint256,address)"(
      _amount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxAvailableShares(overrides?: CallOverrides): Promise<BigNumber>;

    "withdraw()"(overrides?: CallOverrides): Promise<BigNumber>;

    "withdraw(uint256)"(
      maxShares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "withdraw(uint256,address)"(
      maxShares: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "withdraw(uint256,address,uint256)"(
      maxShares: BigNumberish,
      recipient: string,
      maxLoss: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;

    "addStrategy(address,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      lossLimitRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateStrategyDebtRatio(
      strategy: string,
      debtRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateStrategyMinDebtPerHarvest(
      strategy: string,
      minDebtPerHarvest: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateStrategyMaxDebtPerHarvest(
      strategy: string,
      maxDebtPerHarvest: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateStrategyPerformanceFee(
      strategy: string,
      performanceFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setStrategyEnforceChangeLimit(
      strategy: string,
      enabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setStrategySetLimitRatio(
      strategy: string,
      _lossRatioLimit: BigNumberish,
      _profitLimitRatio: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setStrategyCustomCheck(
      strategy: string,
      _customCheck: string,
      overrides?: CallOverrides
    ): Promise<void>;

    migrateStrategy(
      oldVersion: string,
      newVersion: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "revokeStrategy()"(overrides?: CallOverrides): Promise<void>;

    "revokeStrategy(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addStrategyToQueue(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeStrategyFromQueue(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "debtOutstanding()"(overrides?: CallOverrides): Promise<BigNumber>;

    "debtOutstanding(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "creditAvailable()"(overrides?: CallOverrides): Promise<BigNumber>;

    "creditAvailable(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    availableDepositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    "expectedReturn()"(overrides?: CallOverrides): Promise<BigNumber>;

    "expectedReturn(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    report(
      gain: BigNumberish,
      loss: BigNumberish,
      _debtPayment: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sweep(address)"(token: string, overrides?: CallOverrides): Promise<void>;

    "sweep(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    governance(overrides?: CallOverrides): Promise<string>;

    management(overrides?: CallOverrides): Promise<string>;

    guardian(overrides?: CallOverrides): Promise<string>;

    strategies(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        BigNumber,
        BigNumber,
        string
      ] & {
      performanceFee: BigNumber;
      activation: BigNumber;
      debtRatio: BigNumber;
      minDebtPerHarvest: BigNumber;
      maxDebtPerHarvest: BigNumber;
      lastReport: BigNumber;
      totalDebt: BigNumber;
      totalGain: BigNumber;
      totalLoss: BigNumber;
      enforceChangeLimit: boolean;
      profitLimitRatio: BigNumber;
      lossLimitRatio: BigNumber;
      customCheck: string;
    }
      >;

    withdrawalQueue(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    emergencyShutdown(overrides?: CallOverrides): Promise<boolean>;

    depositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

    lastReport(overrides?: CallOverrides): Promise<BigNumber>;

    activation(overrides?: CallOverrides): Promise<BigNumber>;

    lockedProfit(overrides?: CallOverrides): Promise<BigNumber>;

    lockedProfitDegradation(overrides?: CallOverrides): Promise<BigNumber>;

    rewards(overrides?: CallOverrides): Promise<string>;

    managementFee(overrides?: CallOverrides): Promise<BigNumber>;

    performanceFee(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    Transfer(
      sender?: string | null,
      receiver?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { sender: string; receiver: string; value: BigNumber }
      >;

    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
      >;

    StrategyAdded(
      strategy?: string | null,
      debtRatio?: null,
      minDebtPerHarvest?: null,
      maxDebtPerHarvest?: null,
      performanceFee?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        strategy: string;
        debtRatio: BigNumber;
        minDebtPerHarvest: BigNumber;
        maxDebtPerHarvest: BigNumber;
        performanceFee: BigNumber;
      }
      >;

    StrategyReported(
      strategy?: string | null,
      gain?: null,
      loss?: null,
      debtPaid?: null,
      totalGain?: null,
      totalLoss?: null,
      totalDebt?: null,
      debtAdded?: null,
      debtRatio?: null
    ): TypedEventFilter<
      [
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ],
      {
        strategy: string;
        gain: BigNumber;
        loss: BigNumber;
        debtPaid: BigNumber;
        totalGain: BigNumber;
        totalLoss: BigNumber;
        totalDebt: BigNumber;
        debtAdded: BigNumber;
        debtRatio: BigNumber;
      }
      >;

    UpdateGovernance(
      governance?: null
    ): TypedEventFilter<[string], { governance: string }>;

    NewPendingGovernance(
      governance?: null
    ): TypedEventFilter<[string], { governance: string }>;

    UpdateManagement(
      management?: null
    ): TypedEventFilter<[string], { management: string }>;

    UpdateRewards(
      rewards?: null
    ): TypedEventFilter<[string], { rewards: string }>;

    UpdateDepositLimit(
      depositLimit?: null
    ): TypedEventFilter<[BigNumber], { depositLimit: BigNumber }>;

    UpdatePerformanceFee(
      performanceFee?: null
    ): TypedEventFilter<[BigNumber], { performanceFee: BigNumber }>;

    UpdateManagementFee(
      managementFee?: null
    ): TypedEventFilter<[BigNumber], { managementFee: BigNumber }>;

    UpdateGuardian(
      guardian?: null
    ): TypedEventFilter<[string], { guardian: string }>;

    EmergencyShutdown(
      active?: null
    ): TypedEventFilter<[boolean], { active: boolean }>;

    UpdateWithdrawalQueue(
      queue?: null
    ): TypedEventFilter<
      [
        [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ]
      ],
      {
        queue: [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ];
      }
      >;

    StrategyUpdateDebtRatio(
      strategy?: string | null,
      debtRatio?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { strategy: string; debtRatio: BigNumber }
      >;

    StrategyUpdateMinDebtPerHarvest(
      strategy?: string | null,
      minDebtPerHarvest?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { strategy: string; minDebtPerHarvest: BigNumber }
      >;

    StrategyUpdateMaxDebtPerHarvest(
      strategy?: string | null,
      maxDebtPerHarvest?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { strategy: string; maxDebtPerHarvest: BigNumber }
      >;

    StrategyUpdatePerformanceFee(
      strategy?: string | null,
      performanceFee?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { strategy: string; performanceFee: BigNumber }
      >;

    StrategyMigrated(
      oldVersion?: string | null,
      newVersion?: string | null
    ): TypedEventFilter<
      [string, string],
      { oldVersion: string; newVersion: string }
      >;

    StrategyRevoked(
      strategy?: string | null
    ): TypedEventFilter<[string], { strategy: string }>;

    StrategyRemovedFromQueue(
      strategy?: string | null
    ): TypedEventFilter<[string], { strategy: string }>;

    StrategyAddedToQueue(
      strategy?: string | null
    ): TypedEventFilter<[string], { strategy: string }>;
  };

  estimateGas: {
    "initialize(address,address,address,string,string)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "initialize(address,address,address,string,string,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "initialize(address,address,address,string,string,address,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      management: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    apiVersion(overrides?: CallOverrides): Promise<BigNumber>;

    setName(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSymbol(
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGovernance(
      governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setManagement(
      management: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewards(
      rewards: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setLockedProfitDegradation(
      degradation: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDepositLimit(
      limit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPerformanceFee(
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setManagementFee(
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGuardian(
      guardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setEmergencyShutdown(
      active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWithdrawalQueue(
      queue: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transfer(
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      expiry: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

    "deposit()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deposit(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deposit(uint256,address)"(
      _amount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    maxAvailableShares(overrides?: CallOverrides): Promise<BigNumber>;

    "withdraw()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdraw(uint256)"(
      maxShares: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdraw(uint256,address)"(
      maxShares: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdraw(uint256,address,uint256)"(
      maxShares: BigNumberish,
      recipient: string,
      maxLoss: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;

    "addStrategy(address,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      lossLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateStrategyDebtRatio(
      strategy: string,
      debtRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateStrategyMinDebtPerHarvest(
      strategy: string,
      minDebtPerHarvest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateStrategyMaxDebtPerHarvest(
      strategy: string,
      maxDebtPerHarvest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateStrategyPerformanceFee(
      strategy: string,
      performanceFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStrategyEnforceChangeLimit(
      strategy: string,
      enabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStrategySetLimitRatio(
      strategy: string,
      _lossRatioLimit: BigNumberish,
      _profitLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStrategyCustomCheck(
      strategy: string,
      _customCheck: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    migrateStrategy(
      oldVersion: string,
      newVersion: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "revokeStrategy()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "revokeStrategy(address)"(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addStrategyToQueue(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeStrategyFromQueue(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "debtOutstanding()"(overrides?: CallOverrides): Promise<BigNumber>;

    "debtOutstanding(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "creditAvailable()"(overrides?: CallOverrides): Promise<BigNumber>;

    "creditAvailable(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    availableDepositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    "expectedReturn()"(overrides?: CallOverrides): Promise<BigNumber>;

    "expectedReturn(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    report(
      gain: BigNumberish,
      loss: BigNumberish,
      _debtPayment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "sweep(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "sweep(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<BigNumber>;

    management(overrides?: CallOverrides): Promise<BigNumber>;

    guardian(overrides?: CallOverrides): Promise<BigNumber>;

    strategies(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawalQueue(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    emergencyShutdown(overrides?: CallOverrides): Promise<BigNumber>;

    depositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    debtRatio(overrides?: CallOverrides): Promise<BigNumber>;

    totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

    lastReport(overrides?: CallOverrides): Promise<BigNumber>;

    activation(overrides?: CallOverrides): Promise<BigNumber>;

    lockedProfit(overrides?: CallOverrides): Promise<BigNumber>;

    lockedProfitDegradation(overrides?: CallOverrides): Promise<BigNumber>;

    rewards(overrides?: CallOverrides): Promise<BigNumber>;

    managementFee(overrides?: CallOverrides): Promise<BigNumber>;

    performanceFee(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    "initialize(address,address,address,string,string)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "initialize(address,address,address,string,string,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "initialize(address,address,address,string,string,address,address)"(
      token: string,
      governance: string,
      rewards: string,
      nameOverride: string,
      symbolOverride: string,
      guardian: string,
      management: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    apiVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setName(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSymbol(
      symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGovernance(
      governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setManagement(
      management: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewards(
      rewards: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setLockedProfitDegradation(
      degradation: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDepositLimit(
      limit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPerformanceFee(
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setManagementFee(
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGuardian(
      guardian: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setEmergencyShutdown(
      active: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWithdrawalQueue(
      queue: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transfer(
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      expiry: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "deposit()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deposit(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deposit(uint256,address)"(
      _amount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    maxAvailableShares(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "withdraw()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256)"(
      maxShares: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256,address)"(
      maxShares: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256,address,uint256)"(
      maxShares: BigNumberish,
      recipient: string,
      maxLoss: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pricePerShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "addStrategy(address,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addStrategy(address,uint256,uint256,uint256,uint256,uint256,uint256)"(
      strategy: string,
      debtRatio: BigNumberish,
      minDebtPerHarvest: BigNumberish,
      maxDebtPerHarvest: BigNumberish,
      performanceFee: BigNumberish,
      profitLimitRatio: BigNumberish,
      lossLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateStrategyDebtRatio(
      strategy: string,
      debtRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateStrategyMinDebtPerHarvest(
      strategy: string,
      minDebtPerHarvest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateStrategyMaxDebtPerHarvest(
      strategy: string,
      maxDebtPerHarvest: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateStrategyPerformanceFee(
      strategy: string,
      performanceFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStrategyEnforceChangeLimit(
      strategy: string,
      enabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStrategySetLimitRatio(
      strategy: string,
      _lossRatioLimit: BigNumberish,
      _profitLimitRatio: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStrategyCustomCheck(
      strategy: string,
      _customCheck: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    migrateStrategy(
      oldVersion: string,
      newVersion: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "revokeStrategy()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "revokeStrategy(address)"(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addStrategyToQueue(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeStrategyFromQueue(
      strategy: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "debtOutstanding()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "debtOutstanding(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "creditAvailable()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "creditAvailable(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    availableDepositLimit(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "expectedReturn()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "expectedReturn(address)"(
      strategy: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    report(
      gain: BigNumberish,
      loss: BigNumberish,
      _debtPayment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "sweep(address)"(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "sweep(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    management(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    guardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    strategies(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawalQueue(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    emergencyShutdown(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depositLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debtRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalDebt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastReport(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    activation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockedProfit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lockedProfitDegradation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewards(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    managementFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    performanceFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
