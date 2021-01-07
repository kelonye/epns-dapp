import React from 'react';
import _noop from 'lodash/noop';
import * as epns from 'utils/epns';
import { useWallet } from 'contexts/wallet';

const ChannelsContext = React.createContext(null);

export function ChannelsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [channels, setChannels] = React.useState([]);
  const { isLoading: isLoadingWallet } = useWallet();

  const load = async () => {
    if (!isLoadingWallet) {
      setIsLoading(true);
      const cs = await epns.Query().getChannels();
      setChannels(() => cs);
      setIsLoading(false);
    }
  };

  const subscribe = () => {
    if (!isLoadingWallet) {
      return epns.Channels().onAdd(onAdd);
    }
    return _noop;
  };

  const onAdd = async channel => {
    setChannels(channels => [channel].concat(channels));
  };

  React.useEffect(() => {
    load();
    return subscribe();
  }, [isLoadingWallet]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChannelsContext.Provider
      value={{
        isLoading,
        channels,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
}

export function useChannels() {
  const context = React.useContext(ChannelsContext);
  if (!context) {
    throw new Error('Missing channels context');
  }
  const { isLoading, channels } = context;
  return {
    isLoading,
    channels,
  };
}
