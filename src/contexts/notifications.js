import React from 'react';
import * as epns from 'utils/epns';
import { useWallet } from 'contexts/wallet';

const NotificationsContext = React.createContext(null);

export function NotificationsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const { isLoading: isLoadingWallet, address } = useWallet();

  const load = async () => {
    if (!isLoadingWallet) {
      if (address) {
        setIsLoading(true);
        setNotifications(await epns.query.getNotifications(address));
      }
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, [isLoadingWallet, address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotificationsContext.Provider
      value={{
        isLoading,
        notifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationsContext);
  if (!context) {
    throw new Error('Missing notifications context');
  }
  const { isLoading, notifications } = context;
  return {
    isLoading,
    notifications,
  };
}
