import { Event, EventFilter } from "ethers";
import { Result } from "@ethersproject/abi";
import { AllKeysRequired, DynamicObject } from "./util.types";
import { EChainId } from "./web3.types";
import { ESupportedTokens } from "./vault.types";

export interface TypedEvent<EventArgs extends Result> extends Event {
  args: EventArgs;
}

// eslint-disable-next-line
export interface TypedEventFilter<EventArgsArray, EventArgsObject> extends EventFilter {
}

export type TypedListener<
  EventArgsArray extends Array<any>,
  EventArgsObject
> = (
  ...listenerArg: [
    ...EventArgsArray,
    TypedEvent<EventArgsArray & EventArgsObject>
  ]
) => void;

export type MinEthersFactory<C, ARGS> = {
  deploy(...a: ARGS[]): Promise<C>;
};

export type GetContractTypeFromFactory<F> = F extends MinEthersFactory<infer C, any>
  ? C : never;

export type GetARGsTypeFromFactory<F> = F extends MinEthersFactory<any, any>
  ? Parameters<F["deploy"]> : never;

export enum EContractType {
  ERC20 = "ERC20",
  VAULT = "VAULT",
  REGISTRY = "REGISTRY"
}

// Every tokens needs to have an object, but doesn't have to be supported by every network
export type TokenAddressByNetwork =
  DynamicObject<DynamicObject<string, EChainId>, ESupportedTokens, AllKeysRequired>;
