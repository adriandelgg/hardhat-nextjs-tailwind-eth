import { createContext, useState, useEffect } from 'react';

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
	const [contract, setContract] = useState(null);
	const [provider, setProvider] = useState(null);
	const [account, setAccount] = useState('');

	// Listens for a change in account and updates state
	useEffect(() => {
		if (contract && provider) {
			ethereum.on('accountsChanged', newAccount);
			return () => ethereum.removeListener('accountsChanged', newAccount);
		}
	});

	function newAccount(accounts) {
		const signer = provider.getSigner(accounts[0]);
		setContract(contract.connect(signer));
		setAccount(signer._address);
	}

	// Listens for network changes to reload the page
	useEffect(() => {
		ethereum.on('chainChanged', chainId => window.location.reload());
		return () =>
			ethereum.removeListener('chainChanged', chainId =>
				window.location.reload()
			);
	}, []);

	return (
		<Web3Context.Provider
			value={{
				provider,
				setProvider,
				contract,
				setContract,
				account,
				setAccount
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Provider;
