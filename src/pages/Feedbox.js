import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import ConnectWallet from 'components/ConnectWallet';
import { useNotifications } from 'contexts/notifications';
import { useWallet } from 'contexts/wallet';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 300,
    padding: '20px 0',
  },
  paddingWrapper: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    margin: '25px 30px 15px',
    paddingBottom: 10,
    lineHeight: '1.5rem',
    borderBottom: '2px solid #555',
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
  itemIcon: {
    borderRadius: 8,
    marginRight: 20,
  },
}));

export default function NotificationList() {
  const classes = useStyles();
  const { isLoading, notifications } = useNotifications();
  const { address: connected } = useWallet();

  return (
    <div className={clsx(classes.container, 'flex flex-col flex-grow')}>
      {!connected ? (
        <div className={classes.paddingWrapper}>
          <ConnectWallet />
        </div>
      ) : isLoading ? (
        <div className={classes.paddingWrapper}>
          <Loader />
        </div>
      ) : !notifications.length ? (
        <div className={classes.paddingWrapper}>
          You do not have any notifications.
        </div>
      ) : (
        <div className="flex flex-col">
          {notifications.map(notification => (
            <NotificationListItem key={notification.id} {...{ notification }} />
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationListItem({ notification }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.item, 'flex flex-col flex-grow')}>
      <div>{notification.notificationTitle}</div>
      <div>{notification.notificationBody}</div>
    </div>
  );
}
