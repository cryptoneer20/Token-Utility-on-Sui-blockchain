module managed::managed {
    use std::option;
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::url;

    struct MANAGED has drop {}

    fun init(witness: MANAGED, ctx: &mut TxContext) {
        let vect: vector<u8> = b"logo_url";
        let (treasury_cap, metadata) = coin::create_currency<MANAGED>(witness, decimals, b"symbol", b"name", b"description", option::some(url::new_unsafe_from_bytes(vect)), ctx);
        transfer::public_freeze_object(metadata);

        let initial_supply_amount: u64 = TotalSupply;
        let recipient_address = tx_context::sender(ctx);
        coin::mint_and_transfer(&mut treasury_cap, initial_supply_amount, recipient_address, ctx);

        transfer::public_transfer(treasury_cap, recipient_address);
    }

    public fun mint(
        treasury_cap: &mut TreasuryCap<MANAGED>, amount: u64, recipient: address, ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx)
    }

    public fun burn(treasury_cap: &mut TreasuryCap<MANAGED>, coin: Coin<MANAGED>) {
        coin::burn(treasury_cap, coin);
    }
}