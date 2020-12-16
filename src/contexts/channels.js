import React from 'react';
// import { useWallet } from 'contexts/wallet';
import * as epns from 'utils/epns';

const ChannelsContext = React.createContext(null);

export function ChannelsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [channels, setChannels] = React.useState([]);

  const load = async () => {
    if (isLoading) return;
    const channels = await epns.query.getChannels();
    setChannels(channels);
    setIsLoading(false);
  };

  return (
    <ChannelsContext.Provider
      value={{
        isLoading,
        load,
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
  const { isLoading, load, channels } = context;
  return {
    isLoading,
    load,
    channels,
  };
}
