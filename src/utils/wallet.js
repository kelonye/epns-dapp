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
    const provider = await web3Modal.connect();
    provider.on('accountsChanged', () => {
      window.location.reload();
    });
    provider.on('chainChanged', () => {
      window.location.reload();
    });
    // provider.on('disconnect', () => {
    //   disconnect();
    // });
    await this.setProvider(new ethers.providers.Web3Provider(provider));

    this.ethersWallet = this.ethersProvider.getSigner();
    this.address = await this.ethersWallet.getAddress();
  }

  async setFallbackProvider() {
    await this.setProvider(
      new ethers.providers.InfuraProvider('ropsten', INFURA_ID)
    );
  }

  async setProvider(provider) {
    this.ethersProvider = provider;
    this.net = await this.ethersProvider.getNetwork();

    if (this.getNetworkName() !== 'ropsten') {
      return await slPrompt(
        'Wrong network',
        'Please connect to the Ropsten Testnet',
        this.disconnect.bind(this)
      );
    }
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
