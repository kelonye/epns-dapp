import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import {} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  link: {
    padding: '20px 0',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    border: '1px solid transparent',
    borderBottom: '5px solid #555',
    borderRadius: 8,
    margin: '0 15px',
    width: '33.33%',
    ...(theme.palette.isDark
      ? {
          background: '#333',
          color: 'white',
        }
      : {
          borderColor: '#ddd',
          color: '#333',
        }),
  },
  active: {
    borderBottomColor: theme.palette.secondary.main,
  },
}));

function Component() {
  const classes = useStyles();

  const path = window.location.pathname;
  const isFeedbox = '/feedbox' === path;
  const isChannels = '/' === path;
  const isCreateChannel = '/create-channel' === path;

  return (
    <div className="flex flex-grow">
      <Link
        className={clsx(classes.link, {
          [classes.active]: isFeedbox,
        })}
        to="/feedbox"
      >
        Feedbox
      </Link>
      <Link
        className={clsx(classes.link, {
          [classes.active]: isChannels,
        })}
        to="/"
      >
        Channels
      </Link>
      <Link
        className={clsx(classes.link, {
          [classes.active]: isCreateChannel,
        })}
        to="/create-channel"
      >
        Create Channel
      </Link>
    </div>
  );
}

export default withRouter(Component);
