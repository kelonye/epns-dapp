import React from 'react';
import _noop from 'lodash/noop';
import * as epns from 'utils/epns';
import { useWallet } from 'contexts/wallet';

const NotificationsContext = React.createContext(null);

export function NotificationsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const { isLoading: isLoadingWallet, address } = useWallet();
  const [toast, showToast] = React.useState(null);

  const clearToast = () => showToast(null);

  const load = async () => {
    if (!isLoadingWallet) {
      if (address) {
        setIsLoading(true);
        const ns = await epns.Query().getNotifications(address);
        setNotifications(() => ns);
      }
      setIsLoading(false);
    }
  };

  const subscribe = () => {
    if (!isLoadingWallet) {
      if (address) {
        return epns.Notifications().onReceive(onReceive);
      }
    }
    return _noop;
  };

  const onReceive = async notification => {
    showToast(notification);
    setNotifications(notifications => [notification].concat(notifications));
  };

  React.useEffect(() => {
    load();
    return subscribe();
  }, [isLoadingWallet, address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotificationsContext.Provider
      value={{
        isLoading,
        notifications,
        toast,
        clearToast,
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
  const { isLoading, notifications, toast, clearToast } = context;
  return {
    isLoading,
    notifications,
    toast,
    clearToast,
  };
}
