import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import MewConnect from '@myetherwallet/mewconnect-web-client';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { INFURA_ID } from 'config';
import { slPrompt } from 'utils/sl';

const web3Modal = new Web3Modal({
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

class Wallet {
  async connect() {
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

  async disconnect() {
    web3Modal.clearCachedProvider();
    this.address = null;
  }

  getIsCached() {
    return web3Modal.cachedProvider;
  }

  getNetworkName() {
    return ~['homestead'].indexOf(this.net.name) ? 'mainnet' : this.net.name; // todo
  }
}

export default new Wallet();
