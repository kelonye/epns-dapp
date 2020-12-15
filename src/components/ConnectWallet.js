import React from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'contexts/wallet';

export default function() {
  const { connect } = useWallet();

  return (
    <Button color="secondary" onClick={connect}>
      Connect Wallet
    </Button>
  );
}
