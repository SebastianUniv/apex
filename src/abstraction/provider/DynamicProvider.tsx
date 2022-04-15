import * as React from 'react';
import { MoralisProvider } from "react-moralis";
import { MoralisProvider as Moralis } from "./moralis/MoralisProvider"

const PROVIDER = process.env.REACT_APP_PROVIDER?.toLowerCase();

export const DynamicWeb3Provider: React.FC = ({ children }) => {
	// Pick different provider depending on selected environment
	switch (PROVIDER) {
		case 'moralis':
			const moralis = new Moralis();
			const variables = moralis.getEnvVariables();
			return (
				<MoralisProvider appId={variables.appId} serverUrl={variables.serverUrl} initializeOnMount={true}>
					<>
						{children}
					</>
				</MoralisProvider>
			);
		// Default case also covers Web3-React v8 library, as this does not require a provider
		default:
			return (
				<>
					{children}
				</>
			);
	}
}