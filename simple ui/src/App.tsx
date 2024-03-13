
import { useMemo } from "react";
import {WalletProvider, SuiDevnetChain} from "@suiet/wallet-kit"
import '@suiet/wallet-kit/style.css'
import './bootstrap.min.css';
import './App.css'
import AdminPage from "./pages/admin";
import { ProgramProvider } from "./utils/ProgramProvider";

function App() {

  return (
    <WalletProvider chains={[SuiDevnetChain]}>
      <ProgramProvider>
        <AdminPage/>
      </ProgramProvider>
    </WalletProvider>
  );
}

export default App;