import React from 'react';
import { subgraph } from 'utils/xhr';

const ChannelsContext = React.createContext(null);

export function ChannelsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [channels, setChannels] = React.useState([]);

  const load = async () => {
    const { channels } = await subgraph(
      `
        query ($first: Int) {
          channels(first: $first) {
            id
            name
            info
            icon
            url
          }
        }
      `,
      {
        first: 20,
      }
    );
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
