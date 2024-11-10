export const idlFactory = ({ IDL }) => {
  const Address = IDL.Text;
  const TokenType = IDL.Variant({ 'erc1155' : IDL.Null, 'erc721' : IDL.Null });
  const Nft = IDL.Record({
    'tokenId' : IDL.Nat,
    'contract' : Address,
    'owner' : Address,
    'network' : IDL.Text,
    'tokenType' : TokenType,
  });
  const EthWallet__1 = IDL.Text;
  const SignedPrincipal = IDL.Text;
  const ConnectEthWallet = IDL.Bool;
  const Time = IDL.Int;
  const Login = IDL.Record({ 'createTime' : Time });
  const GetEthWallets = IDL.Vec(EthWallet__1);
  const RequestId = IDL.Nat;
  const Internal = IDL.Variant({
    'verifyEcdsaOutcome' : IDL.Bool,
    'verifyOwnerOutcome' : IDL.Tuple(Nft, IDL.Bool),
  });
  const Request = IDL.Variant({
    'login' : IDL.Null,
    'setAddressFiltered' : IDL.Tuple(Address, IDL.Bool),
    'addNfts' : IDL.Vec(Nft),
    'connectEthWallet' : IDL.Tuple(EthWallet__1, SignedPrincipal),
    'isNftOwned' : Nft,
  });
  const Response = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Null });
  const Event = IDL.Variant({
    'internal' : IDL.Record({ 'requestId' : RequestId, 'internal' : Internal }),
    'request' : IDL.Record({
      'requestId' : RequestId,
      'request' : Request,
      'time' : Time,
      'caller' : IDL.Principal,
      'cyclesBalance' : IDL.Opt(IDL.Nat),
    }),
    'install' : IDL.Record({
      'installer' : IDL.Principal,
      'time' : Time,
      'cyclesBalance' : IDL.Opt(IDL.Nat),
    }),
    'response' : IDL.Record({ 'requestId' : RequestId, 'response' : Response }),
  });
  const AddNftEvent = IDL.Record({
    'nft' : Nft,
    'principal' : IDL.Principal,
    'time' : Time,
    'wallet' : EthWallet__1,
  });
  const PublicEvent = IDL.Variant({
    'install' : IDL.Record({ 'time' : Time }),
    'addNft' : AddNftEvent,
  });
  const EthWallet = IDL.Text;
  const NftId = IDL.Record({
    'tokenId' : IDL.Nat,
    'contract' : Address,
    'network' : IDL.Text,
  });
  const OwnershipCheckSuccess = IDL.Record({ 'checkTime' : Time });
  const CreateSuccess = IDL.Record({ 'createTime' : Time });
  const SignatureCheckSuccess = IDL.Record({
    'checkTime' : Time,
    'signedPrincipal' : SignedPrincipal,
  });
  const Nft__1 = IDL.Record({
    'tokenId' : IDL.Nat,
    'contract' : Address,
    'owner' : Address,
    'network' : IDL.Text,
    'tokenType' : TokenType,
  });
  const Entry = IDL.Variant({
    'walletOwnsNft' : IDL.Tuple(EthWallet, NftId, OwnershipCheckSuccess),
    'principal' : IDL.Tuple(IDL.Principal, CreateSuccess),
    'walletSignsPrincipal' : IDL.Tuple(
      EthWallet,
      IDL.Principal,
      SignatureCheckSuccess,
    ),
    'ethNft' : Nft__1,
    'ethWallet' : IDL.Tuple(EthWallet, CreateSuccess),
  });
  const Main = IDL.Service({
    'addNfts' : IDL.Func([IDL.Vec(Nft)], [IDL.Bool], []),
    'connectEthWallet' : IDL.Func(
        [EthWallet__1, SignedPrincipal],
        [ConnectEthWallet],
        [],
      ),
    'fastLogin' : IDL.Func([], [IDL.Opt(Login)], ['query']),
    'getEthWallets' : IDL.Func([], [GetEthWallets], ['query']),
    'getHistory' : IDL.Func([], [IDL.Opt(IDL.Vec(Event))], ['query']),
    'getNfts' : IDL.Func([], [IDL.Vec(Nft)], ['query']),
    'getPublicHistory' : IDL.Func([], [IDL.Vec(PublicEvent)], ['query']),
    'getState' : IDL.Func([], [IDL.Opt(IDL.Vec(Entry))], ['query']),
    'isNftOwned' : IDL.Func([IDL.Principal, Nft], [IDL.Bool], []),
    'login' : IDL.Func([], [Login], []),
    'setAddressFiltered' : IDL.Func([Address, IDL.Bool], [IDL.Bool], []),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
