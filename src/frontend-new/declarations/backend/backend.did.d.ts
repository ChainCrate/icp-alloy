import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AddNftEvent {
  'nft' : Nft,
  'principal' : Principal,
  'time' : Time,
  'wallet' : EthWallet__1,
}
export type Address = string;
export type ConnectEthWallet = boolean;
export interface CreateSuccess { 'createTime' : Time }
export type Entry = {
    'walletOwnsNft' : [EthWallet, NftId, OwnershipCheckSuccess]
  } |
  { 'principal' : [Principal, CreateSuccess] } |
  { 'walletSignsPrincipal' : [EthWallet, Principal, SignatureCheckSuccess] } |
  { 'ethNft' : Nft__1 } |
  { 'ethWallet' : [EthWallet, CreateSuccess] };
export type EthWallet = string;
export type EthWallet__1 = string;
export type Event = {
    'internal' : { 'requestId' : RequestId, 'internal' : Internal }
  } |
  {
    'request' : {
      'requestId' : RequestId,
      'request' : Request,
      'time' : Time,
      'caller' : Principal,
      'cyclesBalance' : [] | [bigint],
    }
  } |
  {
    'install' : {
      'installer' : Principal,
      'time' : Time,
      'cyclesBalance' : [] | [bigint],
    }
  } |
  { 'response' : { 'requestId' : RequestId, 'response' : Response } };
export type GetEthWallets = Array<EthWallet__1>;
export type Internal = { 'verifyEcdsaOutcome' : boolean } |
  { 'verifyOwnerOutcome' : [Nft, boolean] };
export interface Login { 'createTime' : Time }
export interface Main {
  'addNfts' : ActorMethod<[Array<Nft>], boolean>,
  'connectEthWallet' : ActorMethod<
    [EthWallet__1, SignedPrincipal],
    ConnectEthWallet
  >,
  'fastLogin' : ActorMethod<[], [] | [Login]>,
  'getEthWallets' : ActorMethod<[], GetEthWallets>,
  'getHistory' : ActorMethod<[], [] | [Array<Event>]>,
  'getNfts' : ActorMethod<[], Array<Nft>>,
  'getPublicHistory' : ActorMethod<[], Array<PublicEvent>>,
  'getState' : ActorMethod<[], [] | [Array<Entry>]>,
  'isNftOwned' : ActorMethod<[Principal, Nft], boolean>,
  'login' : ActorMethod<[], Login>,
  'setAddressFiltered' : ActorMethod<[Address, boolean], boolean>,
}
export interface Nft {
  'tokenId' : bigint,
  'contract' : Address,
  'owner' : Address,
  'network' : string,
  'tokenType' : TokenType,
}
export interface NftId {
  'tokenId' : bigint,
  'contract' : Address,
  'network' : string,
}
export interface Nft__1 {
  'tokenId' : bigint,
  'contract' : Address,
  'owner' : Address,
  'network' : string,
  'tokenType' : TokenType,
}
export interface OwnershipCheckSuccess { 'checkTime' : Time }
export type PublicEvent = { 'install' : { 'time' : Time } } |
  { 'addNft' : AddNftEvent };
export type Request = { 'login' : null } |
  { 'setAddressFiltered' : [Address, boolean] } |
  { 'addNfts' : Array<Nft> } |
  { 'connectEthWallet' : [EthWallet__1, SignedPrincipal] } |
  { 'isNftOwned' : Nft };
export type RequestId = bigint;
export type Response = { 'ok' : null } |
  { 'err' : null };
export interface SignatureCheckSuccess {
  'checkTime' : Time,
  'signedPrincipal' : SignedPrincipal,
}
export type SignedPrincipal = string;
export type Time = bigint;
export type TokenType = { 'erc1155' : null } |
  { 'erc721' : null };
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
