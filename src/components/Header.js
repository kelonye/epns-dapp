import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  IconButton,
  AppBar,
  Typography,
  Toolbar,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LightSwitch from 'components/LightSwitch';
import ConnectWallet from 'components/ConnectWallet';
import { APP_TITLE } from 'config';
import { useWallet } from 'contexts/wallet';
import wallet from 'utils/wallet';

const useStyles = makeStyles(theme => ({
  account: {
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  backToHome: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  subtitle: {
    fontSize: 9,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default function Component() {
  const classes = useStyles();
  const { address, disconnect } = useWallet();

  const shortAddress =
    address && `${address.slice(0, 6)}....${address.slice(-4)}`;

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar color="inherit">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          to={'/'}
          component={Link}
          className={classes.backToHome}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={'flex flex-grow'}>
          <div className={'flex flex-col'}>
            <div>{APP_TITLE}</div>
            <div className={classes.subtitle}>
              Ethereum Push Notification Service
            </div>
          </div>
        </Typography>

        {address ? (
          <>
            &nbsp;
            <div className={classes.account}>
              {shortAddress} ({wallet.getNetworkName().toUpperCase()})
            </div>
            <Button color="secondary" onClick={disconnect}>
              Disconnect
            </Button>
          </>
        ) : (
          <ConnectWallet />
        )}

        <LightSwitch />
      </Toolbar>
    </AppBar>
  );
}
