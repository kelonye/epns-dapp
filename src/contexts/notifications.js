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

  React.useEffect(() => {
    address && load();
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

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
