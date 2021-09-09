import { useContext } from 'react';
import { Web3Context } from '../Web3Context';

import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { toast } from 'react-toastify';

// prettier-ignore
// const abi =

const MetaMask = () => {
	const { setContract, setProvider, setAccount, account } =
		useContext(Web3Context);

	async function enableEth() {
		try {
			if (window.ethereum) {
				const provider = new Web3Provider(window.ethereum);
				const [account] = await ethereum.request({
					method: 'eth_requestAccounts'
				});
				const chainId = await ethereum.request({ method: 'eth_chainId' });

				let contractAddress;
				switch (chainId) {
					case '0x1': // Mainnet
						contractAddress = '';
						break;
					case '0x3': // Ropsten
						contractAddress = '';
						break;
					case '0x4': // Rinkeby
						contractAddress = '0x0728Bde9e5C90D581e1b5C391AA95a17c2434Bc7';
						break;
					case '0x89': // Polygon Mainnet
						contractAddress = '';
						break;
					case '0x13881': // Polygon Testnet
						contractAddress = '';
						break;
					case '0x7a69': // Hardhat Local
						contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
				}

				const signer = provider.getSigner(account);
				const contract = new Contract(contractAddress, abi, signer);

				setProvider(provider);
				setContract(contract);
				setAccount(contract.signer._address);
			} else if (window.web3) {
				console.log('Update MetaMask');
			} else {
				console.log('Enable MetaMask');
			}
		} catch (e) {
			console.log(e);
		}
	}

	return !account ? (
		<div>
			<button className="metamask-btn" onClick={enableEth}>
				Connect Wallet
			</button>
		</div>
	) : (
		<div>
			<button
				className="blue-btn"
				onClick={() =>
					toast.info(`Your wallet address is: ${account}`, {
						autoClose: 3000,
						style: {
							width: 520
						},
						theme: 'colored'
					})
				}
			>
				Wallet Connected
			</button>
		</div>
	);
};

export default MetaMask;
