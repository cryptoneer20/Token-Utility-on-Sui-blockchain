import { createContext, useContext } from "react";

export interface ProgramContextState{
    createToken(name: string, symbol: string, decimals: number, description: string, logoUrl: string, totalSupply: number) : Promise<void>;
}

export const ProgramContext = createContext<ProgramContextState>({
} as ProgramContextState)

export function useProgram() : ProgramContextState{
    return useContext(ProgramContext)
}