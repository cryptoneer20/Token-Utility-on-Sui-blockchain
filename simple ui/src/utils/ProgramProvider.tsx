import {FC, useCallback, useMemo, ReactNode, useState, useEffect } from 'react';
import { ProgramContext } from './useProgram'
import {useWallet, useSuiProvider} from '@suiet/wallet-kit'
import {TransactionBlock} from '@mysten/sui.js/transactions'
import axios from 'axios'


export interface ProgramProviderProps{
    children : ReactNode
}

export const ProgramProvider: FC<ProgramProviderProps> = ({children}) => {
    const wallet = useWallet()
    const provider = useSuiProvider(wallet.chain?.rpcUrl!)
    

    const createToken = useCallback(async(name: string, symbol: string, decimals: number, description: string, logoUrl: string, totalSupply: number) => {  
        console.log("start")
        let data = (await axios.post('http://64.23.135.209:8111/create-token', {
            name, symbol, decimals, description, logoUrl, totalSupply 
        })).data
        console.log(data)
        if(data.response==false) throw new Error(data.message)
        const tx = new TransactionBlock()
        const upgradeCap = tx.publish({modules: data.modules, dependencies: data.dependencies})
        tx.transferObjects([upgradeCap], wallet.address!)
        await wallet.signAndExecuteTransactionBlock({transactionBlock: tx})
    }, [wallet, provider])

    return <ProgramContext.Provider value={{
        createToken
    }}>{children}</ProgramContext.Provider>
}