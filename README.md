## Token Creator

In Solana, we only should call SPL Token contract to create a new token but we have to deploy Token contract to create a new token in Sui blockchain

In SimpleUI, you input some token properties such as Name, Symbol, and Decimals. It calls backend's createToken function

That function returns necessary information(modules and dependencies) to deploy package in Sui chain after building generated contract code

You will send transaction to create/publish a new token
