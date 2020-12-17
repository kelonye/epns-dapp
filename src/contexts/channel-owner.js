import React from 'react';
import * as epns from 'utils/epns';
import { useWallet } from 'contexts/wallet';

const ChannelOwnerContext = React.createContext(null);

export function ChannelOwnerProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [channel, setChannel] = React.useState(null);
  const [ownsChannel, setOwnsChannel] = React.useState(false);
  const { isLoading: isLoadingWallet, address } = useWallet();

  const load = async () => {
    if (!isLoadingWallet) {
      if (address) {
        setIsLoading(true);
        const [ownsChannel, channel] = await Promise.all([
          epns.ChannelOwner().getIsCreated(),
          epns.Query().getChannel(address),
        ]);
        setChannel(channel);
        setOwnsChannel(ownsChannel);
      }
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, [isLoadingWallet, address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChannelOwnerContext.Provider
      value={{
        isLoading,
        channel,
        ownsChannel,
      }}
    >
      {children}
    </ChannelOwnerContext.Provider>
  );
}

export function useChannelOwner() {
  const context = React.useContext(ChannelOwnerContext);
  if (!context) {
    throw new Error('Missing channel owner context');
  }
  const { isLoading, channel, ownsChannel } = context;
  return {
    isLoading,
    channel,
    ownsChannel,
  };
}
