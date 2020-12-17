import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useNotifications } from 'contexts/notifications';

const useStyles = makeStyles(theme => ({
  container: {
    lineHeight: '1.5rem',
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
  date: {
    fontSize: 11,
  },
  toast: {
    '& .MuiSnackbarContent-root': {
      alignItems: 'flex-start',
    },
  },
  close: {
    alignItems: 'flex-start',
  },
}));

export default function() {
  const classes = useStyles();
  const { toast, clearToast } = useNotifications();

  return (
    <Snackbar
      open={!!toast}
      onClose={clearToast}
      message={
        !toast ? null : (
          <div className={clsx(classes.container, 'flex flex-col flex-grow')}>
            {/*<div className={classes.date}>
              {moment
                .unix(toast.indexTimestamp)
                .local()
                .format('YYYY-MM-DD h:mm:ss a')}
              </div>*/}
            <div>{toast.title}</div>
            <div>{toast.body}</div>
          </div>
        )
      }
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={clearToast}
            className={classes.close}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      className={classes.toast}
    />
  );
}
