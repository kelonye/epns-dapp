import React from 'react';
// import _flatten from 'lodash/flatten';
import { useWallet } from 'contexts/wallet';
import * as epns from 'utils/epns';

const NotificationsContext = React.createContext(null);

export function NotificationsProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const { address: userAddress } = useWallet();

  const load = async () => {
    if (isLoading) return;

    // const { subscriptionStates } = await epns.query.request(
    //   `
    //   query ($userAddress: String) {
    //     subscriptionStates(where: {userAddress: $userAddress}) {
    //       subscribed
    //       channelAddress
    //     }
    //   }
    // `,
    //   {
    //     userAddress,
    //   }
    // );

    // const channelNotifications = async channelAddress => {
    //   const { notifications } = await epns.query.request(
    //     `
    //       query ($channelAddress: String) {
    //         notifications(where: {channelAddress: $channelAddress}) {
    //           id
    //           notificationTitle
    //           notificationBody
    //         }
    //       }
    //     `,
    //     {
    //       channelAddress,
    //     }
    //   );
    //   return notifications;
    // };

    // const notifications = _flatten(
    //   await Promise.all([
    //     epns.query.getNotifications(userAddress),
    //     ...subscriptionStates
    //       .filter(s => s.subscribed)
    //       .map(s => channelNotifications(s.channelAddress)),
    //   ])
    // );

    setNotifications(await epns.query.getNotifications(userAddress));
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
