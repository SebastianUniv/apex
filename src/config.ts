import { t } from "@lingui/macro";
import { FC, SVGProps } from "react";
import { ReactComponent as EthSVG } from './assets/crypto-icons/svg/color/eth.svg';
import { ReactComponent as MaticSVG } from './assets/crypto-icons/svg/color/matic.svg';
import { ReactComponent as MetamaskSVG } from './assets/crypto-wallets/metamask.svg';
import { ReactComponent as WalletConnectSVG } from './assets/crypto-wallets/walletconnect.svg';
import { ReactComponent as Cross } from './assets/cross-red-circle.svg';
import { Globe, Icon, Moon, Sun } from 'react-feather';
import { useTheme } from "@mui/material/styles";

// Blockchain currency that is used for gas
export interface NativeCurrency {
    name: string;
    symbol: string;
    decimals: number;
};

// Wallet connector
export interface Connector {
    name: string;
    svg: FC<SVGProps<SVGSVGElement>>;
};

// Respective blockchain and its components
export interface Chain {
    chainId: number;
    name: string;
    svg: FC<SVGProps<SVGSVGElement>>;
    nativeCurrency?: NativeCurrency;
    blockExplorerUrls: (string | undefined)[];
};

export interface MenuItem {
    name: string;
    text: string;
    icon: Icon;
};

export interface Config {
    layout: {
        pages: string[];
        settings: MenuItem[];
    };
    web3: {
        connectors: Connector[];
        chains: Chain[];
    };
};

const ETH: NativeCurrency = {
    name: 'Ethers',
    symbol: 'ETH',
    decimals: 18,
};

const MATIC: NativeCurrency = {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
};

// Supported chains
const chains: Chain[] = [
    {
        chainId: 0,
        name: 'Unsupported Network',
        svg: Cross,
        nativeCurrency: undefined,
        blockExplorerUrls: []
    },
    {
        chainId: 1,
        name: 'Ethereum',
        svg: EthSVG,
        nativeCurrency: ETH,
        blockExplorerUrls: [
            process.env.infuraKey ? `https://mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            process.env.alchemyKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
        ].filter((url) => url !== undefined)
    },
    {
        chainId: 137,
        name: 'Polygon',
        svg: MaticSVG,
        nativeCurrency: MATIC,
        blockExplorerUrls: [
            process.env.infuraKey ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://polygon-rpc.com',
        ].filter((url) => url !== undefined)
    },
    {
        chainId: 80001,
        name: 'Polygon Mumbai',
        svg: MaticSVG,
        nativeCurrency: MATIC,
        blockExplorerUrls: ['https://mumbai.polygonscan.com']
    },
];

// Supported connectors
export const connectors: Connector[] = [
    {
        name: 'MetaMask',
        svg: MetamaskSVG
    },
    {
        name: 'WalletConnect',
        svg: WalletConnectSVG,
    }
];

// Config hook which can be used in React components
export const useConfig = (): Config => {
    const theme = useTheme();
    return {
        layout: {
            pages: [],
            settings: [
                { name: 'lang', text: t`Language`, icon: Globe },
                { name: 'theme', text: t`Theme`, icon: theme.palette.mode === 'dark' ? Moon : Sun }
            ]
        },
        web3: {
            connectors: connectors,
            chains: chains
        }
    }
}