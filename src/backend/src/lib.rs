mod auth;
mod evm;
mod log;
mod run;
mod service;
mod baskets;
use baskets::*;

use alloy::{
    primitives::{address, aliases::U24, Address, U256},
    signers::icp::IcpSigner,
    sol,
};
use candid::{CandidType,Principal};
use ic_cdk::export_candid;
use ic_cdk_timers::TimerId;
use log::LogItem;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;

pub const UNISWAP_V3_SWAP_ROUTER: Address = address!("3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E");
pub const UNISWAP_V3_FACTORY: Address = address!("0227628f3F023bb0B980b67D528571c95c6DaC1c");

pub const MAX_ALLOWANCE: U256 = U256::MAX;

sol!(
    #[sol(rpc)]
    "sol/IUniswapV3SwapRouter.sol"
);

sol!(
    #[sol(rpc)]
    "sol/IUniswapV3Factory.sol"
);

sol!(
    #[sol(rpc)]
    "sol/IUniswapV3PoolState.sol"
);

sol!(
    #[sol(rpc)]
    "sol/IERC20.sol"
);

#[derive(Serialize, Deserialize, CandidType)]
pub struct CanisterSettingsDto {
    pub owner: String,
    pub token_in_address: String,
    pub token_in_name: String,
    pub token_out_address: String,
    pub token_out_name: String,
    pub fee: u64,
    pub amount_in: u64,
    pub slippage: u64,
    pub interval: u64,
}

#[derive(Default)]
pub struct State {
    // Settings
    owner: String,
    token_in_address: Address,
    token_in_name: String,
    token_out_address: Address,
    token_out_name: String,
    fee: U24,
    amount_in: U256,
    slippage: U256,
    interval: u64,

    // Runtime
    timer_id: Option<TimerId>,
    signer: Option<IcpSigner>,
    canister_eth_address: Option<Address>,
    uniswap_v3_pool_address: Option<Address>,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

export_candid!();
