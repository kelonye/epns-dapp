import React from 'react';
import * as epns from 'utils/epns';

const ChannelOwnerContext = React.createContext(null);

export function ChannelOwnerProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [ownsChannel, setOwnsChannel] = React.useState(false);

  const load = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setOwnsChannel(await epns.ChannelOwner().getIsCreated());
    setIsLoading(false);
  };

  return (
    <ChannelOwnerContext.Provider
      value={{
        isLoading,
        load,
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
  const { isLoading, load, ownsChannel } = context;
  return {
    isLoading,
    load,
    ownsChannel,
  };
}
