import * as epns from 'epns-sdk';
import wallet from 'utils/wallet';

const SUBGRAPH_URL = process.env.REACT_APP_SUBGRAPH_URL;
const ROPSTEN_EPNS_CONTRACT_ADDRESS =
  process.env.REACT_APP_ROPSTEN_EPNS_CONTRACT_ADDRESS;

export const query = new epns.Query(SUBGRAPH_URL);

export const ChannelSubscription = channelAddress =>
  new epns.ChannelSubscription(
    ROPSTEN_EPNS_CONTRACT_ADDRESS,
    wallet.ethersWallet,
    channelAddress
  );
