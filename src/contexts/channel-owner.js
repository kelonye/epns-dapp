import React from 'react';
import * as epns from 'utils/epns';
import { useWallet } from 'contexts/wallet';

const ChannelOwnerContext = React.createContext(null);

export function ChannelOwnerProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [ownsChannel, setOwnsChannel] = React.useState(false);
  const { isLoading: isLoadingWallet, address } = useWallet();

  const load = async () => {
    if (!isLoadingWallet) {
      if (address) {
        setIsLoading(true);
        setOwnsChannel(await epns.ChannelOwner().getIsCreated());
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
  const { isLoading, ownsChannel } = context;
  return {
    isLoading,
    ownsChannel,
  };
}
