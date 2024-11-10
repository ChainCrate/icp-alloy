use alloy::{
    hex::FromHex,
    primitives::{address, aliases::U24, Address, U256},
    signers::icp::IcpSigner,
    sol,
};

use candid::{CandidType, Nat, Principal};
use ic_cdk::export_candid;
use ic_cdk_timers::TimerId;
use log::LogItem;
use serde::{Deserialize, Serialize};
use core::time;
use std::{cell::RefCell, ops::Add};
use std::collections::HashMap;
use ic_cdk::api::time;
use crate::{
    auth::only_owner,
    evm::{erc_20, uniswap_v3_factory},
    log::{self, log_error, log_success, LogItemEvent},
    run::first_run,
    STATE,
};
use std::time::Duration;

pub const FIRST_RUN_DELAY: u64 = 30; // Seconds


thread_local! {
    static BASKETS: RefCell<HashMap<BasketType, Basket>> = RefCell::new({
        let mut baskets = HashMap::new();
        
        // Initialize MEME basket
        baskets.insert(BasketType::MEME, Basket {
            basket_type: BasketType::MEME,
            name: "MEME Basket".to_string(),
            tokens: vec![
                Token {
                    name: "PEPE".to_string(),
                    address: Principal::from_text("pepe_principal_id").unwrap(),
                    decimals: 18,
                    balance: 0,
                },
                Token {
                    name: "DOGE".to_string(),
                    address: Principal::from_text("doge_principal_id").unwrap(),
                    decimals: 18,
                    balance: 0,
                },
                Token {
                    name: "SHIB".to_string(),
                    address: Principal::from_text("shib_principal_id").unwrap(),
                    decimals: 18,
                    balance: 0,
                }
            ],
            total_eth_locked: 0,
            total_value_locked: 0,
            user_positions: HashMap::new(),
        });

        // Initialize other baskets similarly...
        baskets
    });

    static DASHBOARD: RefCell<HashMap<Principal, DashboardView>> = RefCell::new(HashMap::new());
}



#[derive(Eq, Hash, PartialEq,CandidType, Deserialize, Clone, Debug)]
pub enum BasketType {
    MEME,    // PEPE, DOGE, SHIB
    DEFI,    // AAVE, UNI, LINK
    STABLE,  // USDC, USDT, DAI
    BTC,     // WBTC, renBTC, sBTC
}

// Define the token structure
#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Token {
    name: String,
    address: Principal,
    decimals: u8,
    balance: u128,  // Track token balance in the basket
}

// Define the user's position in the basket
#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct UserPosition {
    basket_type: BasketType,
    token_amounts: HashMap<String, u128>,  // Token name -> amount
    eth_deposited: u128,
    timestamp: u64,
}

// Define the basket structure
#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Basket {
    basket_type: BasketType,
    name: String,
    tokens: Vec<Token>,
    total_eth_locked: u128,
    total_value_locked: u128,  // Total value in USD
    user_positions: HashMap<Principal, Vec<UserPosition>>,  // Track multiple positions per user
}

// Dashboard view structure
#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct DashboardView {
    user: Principal,
    total_eth_invested: u128,
    total_value_locked: u128,
    basket_investments: Vec<BasketInvestment>,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct BasketInvestment {
    basket_type: BasketType,
    eth_invested: u128,
    current_value: u128,
    token_balances: HashMap<String, u128>,
    timestamp: u64,
}


#[ic_cdk::update]
async fn deposit( basket_type: BasketType) -> Result<(),String> {
    let caller = ic_cdk::caller();
    let current_time = time();
    // let amount = u128::try_from(amount_in)
    //     .map_err(|_| "Invalid amount".to_string())?;
    let amount = 1u128; 
    
    // let mut token_amounts = HashMap::new();
    //in this deposit function we will take the caller
    // and store the data in the above stucts
    // we will aslo take the amount_in as Nat
    let mut token_amounts = HashMap::new();
    
    // Update basket state
    BASKETS.with(|baskets| -> Result<(), String> {
        let mut baskets = baskets.borrow_mut();
        let basket = baskets.get_mut(&basket_type)
            .ok_or_else(|| "Basket type not found".to_string())?;

        // Calculate amount per token
        let amount_per_token = amount / basket.tokens.len() as u128;

        // Update token balances and create token amounts map
        for token in &mut basket.tokens {
            token.balance += amount_per_token;
            token_amounts.insert(token.name.clone(), amount_per_token);
        }

        // Create user position
        let position = UserPosition {
            basket_type: basket_type.clone(),
            token_amounts: token_amounts.clone(),
            eth_deposited: amount,
            timestamp: current_time,
        };

        // Update user positions
        basket.user_positions
            .entry(caller)
            .or_insert_with(Vec::new)
            .push(position);

        // Update basket totals
        basket.total_eth_locked += amount;
        basket.total_value_locked += amount;

        Ok(())
    })?;

    // Update dashboard
    DASHBOARD.with(|dashboard| -> Result<(), String> {
        let mut dashboard = dashboard.borrow_mut();
        let user_dashboard = dashboard.entry(caller).or_insert(DashboardView {
            user: caller,
            total_eth_invested: 0,
            total_value_locked: 0,
            basket_investments: Vec::new(),
        });

        user_dashboard.total_eth_invested += amount;
        user_dashboard.total_value_locked += amount;

        user_dashboard.basket_investments.push(BasketInvestment {
            basket_type,
            eth_invested: amount,
            current_value: amount,
            token_balances: token_amounts,
            timestamp: current_time,
        });

        Ok(())
    })?;

    Ok(())
}



#[ic_cdk::update]
async fn swap_pepe() -> Result<String,String> {
    let pepe_address =Address::from_hex("0x1f9840a85d5af5bf1d1762f925bdaddc4201f984").unwrap();
    let pepe_swap_fee = U24::from(3000); 
    // token in will always be ETH 

    let token_in = Address::from_hex("0xfff9976782d46cc05630d1f6ebab18b2324d6b14").unwrap();

    // STATE.with_borrow_mut(|state| {
    //     if state.timer_id.is_some() {
    //         return Err("Already started".to_string());
    //     }
    //     Ok(())
    // })?;

    

    match erc_20::approve(token_in).await {
        Ok(hash) => log_success(LogItemEvent::Approve, Some(hash)),
        Err(msg) => {
            log_error(LogItemEvent::Approve, Some(msg));
            return Err("Start failed, could not approve spending".to_string());
        }
    }


     // Get and save the pool address for the given tokens and fee
     match uniswap_v3_factory::get_pool(token_in, pepe_address, pepe_swap_fee).await {
        Ok(pool_address) => {
            STATE.with_borrow_mut(|state| {
                state.uniswap_v3_pool_address = Some(pool_address);
            });
            log_success(
                LogItemEvent::SavePoolAddress,
                Some(pool_address.to_string()),
            );
        }
        Err(msg) => {
            log_error(LogItemEvent::SavePoolAddress, Some(msg));
            return Err("Start failed, could not save pool address".to_string());
        }
    }

     // Initiate the first run that in turn will set the timer for the next run
     STATE.with_borrow_mut(|state| {

        state.token_in_address = token_in;
        state.token_in_name = "WETH".to_string();
        state.token_out_address = pepe_address;
        state.token_out_name = "PEPE".to_string();
        state.fee = pepe_swap_fee;
        state.amount_in = U256::from(10000000000000000u128);
        // state.slippage = U256::from(15);
        // Set default slippage if not already set
        if state.slippage == U256::from(0) {
            state.slippage = U256::from(51); // 0.5% default slippage
        }


        state.timer_id = Some(ic_cdk_timers::set_timer(
            Duration::from_secs(FIRST_RUN_DELAY), // Delay to allow the approve transaction to be confirmed creating more transactions.
            first_run,
        ));
    });

    log_success(LogItemEvent::Start, None);
    Ok("Started".to_string())



}



#[ic_cdk::update]
async fn swap_link() -> Result<String,String> {
    let pepe_address =Address::from_hex("0x779877a7b0d9e8603169ddbd7836e478b4624789").unwrap(); // link
    let pepe_swap_fee = U24::from(100); 
    // token in will always be ETH 

    let token_in = Address::from_hex("0xfff9976782d46cc05630d1f6ebab18b2324d6b14").unwrap();

    // STATE.with_borrow_mut(|state| {
    //     if state.timer_id.is_some() {
    //         return Err("Already started".to_string());
    //     }
    //     Ok(())
    // })?;

    

    match erc_20::approve(token_in).await {
        Ok(hash) => log_success(LogItemEvent::Approve, Some(hash)),
        Err(msg) => {
            log_error(LogItemEvent::Approve, Some(msg));
            return Err("Start failed, could not approve spending".to_string());
        }
    }


     // Get and save the pool address for the given tokens and fee
     match uniswap_v3_factory::get_pool(token_in, pepe_address, pepe_swap_fee).await {
        Ok(pool_address) => {
            STATE.with_borrow_mut(|state| {
                state.uniswap_v3_pool_address = Some(pool_address);
            });
            log_success(
                LogItemEvent::SavePoolAddress,
                Some(pool_address.to_string()),
            );
        }
        Err(msg) => {
            log_error(LogItemEvent::SavePoolAddress, Some(msg));
            return Err("Start failed, could not save pool address".to_string());
        }
    }

     // Initiate the first run that in turn will set the timer for the next run
     STATE.with_borrow_mut(|state| {

        state.token_in_address = token_in;
        state.token_in_name = "WETH".to_string();
        state.token_out_address = pepe_address;
        state.token_out_name = "LINK".to_string();
        state.fee = pepe_swap_fee;
        state.amount_in = U256::from(10000000000000000u128);
        // state.slippage = U256::from(15);
        // Set default slippage if not already set
        if state.slippage == U256::from(0) {
            state.slippage = U256::from(51); // 0.5% default slippage
        }


        state.timer_id = Some(ic_cdk_timers::set_timer(
            Duration::from_secs(FIRST_RUN_DELAY), // Delay to allow the approve transaction to be confirmed creating more transactions.
            first_run,
        ));
    });

    log_success(LogItemEvent::Start, None);
    Ok("Started".to_string())



}




#[ic_cdk::update]
async fn swap_wbtc() -> Result<String,String> {
    let pepe_address =Address::from_hex("0x52eea312378ef46140ebe67de8a143ba2304fd7c").unwrap(); // wbtc
    let pepe_swap_fee = U24::from(500); 
    // token in will always be ETH 

    let token_in = Address::from_hex("0xfff9976782d46cc05630d1f6ebab18b2324d6b14").unwrap();

    // STATE.with_borrow_mut(|state| {
    //     if state.timer_id.is_some() {
    //         return Err("Already started".to_string());
    //     }
    //     Ok(())
    // })?;

    

    match erc_20::approve(token_in).await {
        Ok(hash) => log_success(LogItemEvent::Approve, Some(hash)),
        Err(msg) => {
            log_error(LogItemEvent::Approve, Some(msg));
            return Err("Start failed, could not approve spending".to_string());
        }
    }


     // Get and save the pool address for the given tokens and fee
     match uniswap_v3_factory::get_pool(token_in, pepe_address, pepe_swap_fee).await {
        Ok(pool_address) => {
            STATE.with_borrow_mut(|state| {
                state.uniswap_v3_pool_address = Some(pool_address);
            });
            log_success(
                LogItemEvent::SavePoolAddress,
                Some(pool_address.to_string()),
            );
        }
        Err(msg) => {
            log_error(LogItemEvent::SavePoolAddress, Some(msg));
            return Err("Start failed, could not save pool address".to_string());
        }
    }

     // Initiate the first run that in turn will set the timer for the next run
     STATE.with_borrow_mut(|state| {

        state.token_in_address = token_in;
        state.token_in_name = "WETH".to_string();
        state.token_out_address = pepe_address;
        state.token_out_name = "USDT".to_string();
        state.fee = pepe_swap_fee;
        state.amount_in = U256::from(10000000000000000u128);
        // state.slippage = U256::from(15);
        // Set default slippage if not already set
        if state.slippage == U256::from(0) {
            state.slippage = U256::from(51); // 0.5% default slippage
        }


        state.timer_id = Some(ic_cdk_timers::set_timer(
            Duration::from_secs(FIRST_RUN_DELAY), // Delay to allow the approve transaction to be confirmed creating more transactions.
            first_run,
        ));
    });

    log_success(LogItemEvent::Start, None);
    Ok("Started".to_string())



}



#[ic_cdk::query]
pub fn get_dashboard(user: Principal) -> Option<DashboardView> {
    DASHBOARD.with(|dashboard| {
        dashboard.borrow().get(&user).cloned()
    })
}

#[ic_cdk::query]
pub fn get_basket_investments(user: Principal, basket_type: BasketType) -> Vec<UserPosition> {
    BASKETS.with(|baskets| {
        baskets
            .borrow()
            .get(&basket_type)
            .and_then(|basket| basket.user_positions.get(&user))
            .cloned()
            .unwrap_or_default()
    })
}




