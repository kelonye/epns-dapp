import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
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
    margin: '0 30px 10px',
    lineHeight: '1.5rem',
    borderBottom: '2px solid #555',
    padding: '0 0 10px',
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
  itemIcon: {
    borderRadius: 8,
    marginRight: 20,
  },
  itemDate: {
    fontSize: 11,
  },
}));

export default function NotificationList() {
  const classes = useStyles();
  const { isLoading, notifications } = useNotifications();
  const { address: connected } = useWallet();

  return (
    <div className={clsx(classes.container, 'flex flex-col flex-grow')}>
      {isLoading ? (
        <div className={classes.paddingWrapper}>
          <Loader />
        </div>
      ) : !connected ? (
        <div className={classes.paddingWrapper}>
          <ConnectWallet />
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
      <div className={classes.itemDate}>
        {moment
          .unix(notification.indexTimestamp)
          .local()
          .format('YYYY-MM-DD h:mm:ss a')}
      </div>
      <div>{notification.title}</div>
      <div>{notification.body}</div>
    </div>
  );
}
