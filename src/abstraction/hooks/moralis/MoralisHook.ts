import { t } from "@lingui/macro";
import { useState } from "react";
import { useMoralis, useChain, MoralisContextValue } from "react-moralis";
import { AuthConfig, Hook, Web3User } from '../DynamicWeb3Hook';

export default function useMoralisHook(): Hook {
    const moralis: MoralisContextValue = useMoralis();
    const chain = useChain();
    let [user, setUser] = useState<Web3User | null>(null)

    async function initialize() {
        if (moralis.isAuthenticated && !moralis.isWeb3Enabled && !moralis.isWeb3EnableLoading) {
            await moralis.enableWeb3();
        }
    }

    function authenticate(config: AuthConfig): void {
        moralis.authenticate({ signingMessage: t`Login to Dutch Digital Collectibles`, provider: config.provider, chainId: config.chainId });
    }

    function isAuthenticated(): boolean {
        return moralis.isAuthenticated;
    }

    function getUserInfo(): Web3User | null {
        if (user?.accounts !== moralis.user?.attributes.accounts) {
            setUser({ accounts: moralis.user?.attributes.accounts })
        }
        return user;
    }

    function switchChain(chainId: number): Promise<void> {
        return chain.switchNetwork('0x' + chainId.toString(16));
    }

    function getChain(): number | null {
        if (chain.chainId) {
            return parseInt(chain.chainId, 16);
        } else {
            return null;
        }
    }

    function getConnector(): string | undefined {
        return moralis.web3?.connection.url;
    }

    return {
        authenticate,
        isAuthenticated,
        getUserInfo,
        switchChain,
        getChain,
        initialize,
        getConnector
    };
}