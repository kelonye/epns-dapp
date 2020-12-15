import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    padding: '100px 0',
  },
}));

export default function Component() {
  const classes = useStyles();

  return <div className={clsx(classes.container, 'flex flex-grow')}>Todo</div>;
}
