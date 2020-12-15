import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import MewConnect from '@myetherwallet/mewconnect-web-client';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { INFURA_ID } from 'config';
// import { EPNS } from 'epns-sdk/lib/index.ts';
import { slPrompt } from 'utils/sl';

import EPNS_CONTRACT_ABI from 'abis/epns.json';

const ROPSTEN_EPNS_CONTRACT_ADDRESS =
  process.env.REACT_APP_ROPSTEN_EPNS_CONTRACT_ADDRESS;

export const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    mewconnect: {
      package: MewConnect,
      options: {
        infuraId: INFURA_ID,
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

export default class Wallet {
  async connect() {
    await this.setupEthers();
    await this.setupEPNS();
  }

  async setupEthers() {
    this.web3Provider = await web3Modal.connect();
    this.ethersProvider = new ethers.providers.Web3Provider(this.web3Provider);
    this.net = await this.ethersProvider.getNetwork();

    if (this.getNetworkName() !== 'ropsten') {
      return await slPrompt(
        'Wrong network',
        'Please connect to the Ropsten Testnet',
        this.disconnect.bind(this)
      );
    }

    this.ethersWallet = this.ethersProvider.getSigner();
    this.address = await this.ethersWallet.getAddress();

    this.web3Provider.on('accountsChanged', () => {
      window.location.reload();
    });
    this.web3Provider.on('chainChanged', () => {
      window.location.reload();
    });
    // web3Provider.on('disconnect', () => {
    //   disconnect();
    // });
  }

  async setupEPNS() {
    // this.epns = new EPNS(this.ethersWallet);
    this.epnsContract = new ethers.Contract(
      ROPSTEN_EPNS_CONTRACT_ADDRESS,
      EPNS_CONTRACT_ABI,
      this.ethersWallet
    );
  }

  async disconnect() {
    web3Modal.clearCachedProvider();
    this.address = null;
  }

  getNetworkName() {
    return ~['homestead'].indexOf(this.net.name) ? 'mainnet' : this.net.name; // todo
  }
}
