import React from 'react';
import { useWallet } from 'contexts/wallet';
import * as epns from 'utils/epns';

const NotificationsContext = React.createContext(null);

export function NotificationsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const { address: userAddress } = useWallet();

  const load = async () => {
    const notifications = await epns.query.getNotifications(userAddress);
    setNotifications(notifications);
    setIsLoading(false);
  };

  return (
    <NotificationsContext.Provider
      value={{
        isLoading,
        load,
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
  const { isLoading, load, notifications } = context;
  return {
    isLoading,
    load,
    notifications,
  };
}
