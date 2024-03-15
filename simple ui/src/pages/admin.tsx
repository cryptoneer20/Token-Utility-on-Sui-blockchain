import { useState, useEffect } from 'react';
import { useProgram } from "../utils/useProgram";
import { openNotification } from "../utils/constants";
import {ConnectButton} from '@suiet/wallet-kit'


export default function AdminPage(){
	const {createToken} = useProgram()

    const [name, setName] = useState('TestSui')
    const [symbol, setSymbol] = useState('tSui')
    const [decimals, setDecimals] = useState('3')
    const [description, setDescription] = useState('This is test token')
    const [logoUrl, setLogoUrl] = useState('https://ord-mirror.magiceden.dev/content/5bcae59edd671f6859d848a39a8ada7fd6c48c152731c26a7d87808b2cf503b5i135')
    const [totalSupply, setTotalSupply] = useState('100')

    return <div className='row m-3'>
        <ConnectButton>Connect Wallet</ConnectButton>
        <div className='col-lg-6'>
            <div className="input-group m-1 mt-5">
		        <span className="input-group-text">Name: </span>
		        <input name="name"  type="text" className="form-control" onChange={(event)=>{setName(event.target.value)}} value={name}/>
		    </div>
            <div className="input-group m-1">
		        <span className="input-group-text">Symbol: </span>
		        <input name="symbol"  type="text" className="form-control" onChange={(event)=>{setSymbol(event.target.value)}} value={symbol}/>
		    </div>
            <div className="input-group m-1">
		        <span className="input-group-text">Decimals: </span>
		        <input name="decimals"  type="number" className="form-control" onChange={(event)=>{setDecimals(event.target.value)}} value={decimals}/>
		    </div>
            <div className="input-group m-1">
		        <span className="input-group-text">Description: </span>
		        <input name="description"  type="text" className="form-control" onChange={(event)=>{setDescription(event.target.value)}} value={description}/>
		    </div>
            <div className="input-group m-1">
		        <span className="input-group-text">Logo URL: </span>
		        <input name="logoUrl"  type="text" className="form-control" onChange={(event)=>{setLogoUrl(event.target.value)}} value={logoUrl}/>
		    </div>
            <div className="input-group m-1">
		        <span className="input-group-text">Total Supply: </span>
		        <input name="totalSupply"  type="number" className="form-control" onChange={(event)=>{setTotalSupply(event.target.value)}} value={totalSupply}/>
		    </div>
            <div className='row m-3'>
                <button type="button" className='btn btn-success' onClick={async()=>{
                    try{
                        if(name=='') throw new Error('Invalid Name')
                        if(symbol=='') throw new Error('Invalid Symbol')
                        if(decimals=='' || isNaN(decimals as any) || Number(decimals)!=Math.floor(Number(decimals)) || Number(decimals)<0) throw new Error('Invalid Decimals')
                        await createToken(name, symbol, Number(decimals), description, logoUrl, Number(totalSupply) * 10**Number(decimals))
                        openNotification('success', 'CreateToken success')
                    }catch(err: any){
                        console.log(err)
                        openNotification('error', err.message)
                    }
                }}>Create Token</button>
            </div>
        </div>
    </div>
}