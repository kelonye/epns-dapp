import React from 'react';
import { subgraph } from 'utils/xhr';
import { useWallet } from 'contexts/wallet';

const NotificationsContext = React.createContext(null);

export function NotificationsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const { address } = useWallet();

  const load = async () => {
    const { notifications } = await subgraph(
      `
        query ($userAddress: String) {
          notifications(where: {userAddress: $userAddress}) {
            id
            notificationTitle
            notificationBody
          }
        }
      `,
      {
        userAddress: address,
      }
    );
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
