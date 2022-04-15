import { MoralisContextValue } from 'react-moralis';
import useMoralisHook from './moralis/MoralisHook';

const PROVIDER = process.env.REACT_APP_PROVIDER?.toLowerCase();

export type Hook = {
    initialize: () => void,
    authenticate: (config: AuthConfig) => void,
    isAuthenticated: () => boolean,
    getUserInfo: () => any,
    switchChain(chainId: number): Promise<void>,
    getChain(): number | null,
    getConnector(): string | undefined
};


export interface AuthConfig {
    chainId: number;
    provider: "metamask" | "walletconnect" | "walletConnect" | "wc" | "magicLink" | "web3Auth";
};

export interface Web3User {
    accounts: string[];
};

function selectHook(): () => Hook {
    switch (PROVIDER) {
        case 'moralis':
            return useMoralisHook;
        // TODO: implement web3-react lib
        default:
            throw new Error(" You are using a non implemented library!");
    }
}

export default selectHook();

