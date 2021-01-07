import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Loader from 'components/Loader';
import ConnectWallet from 'components/ConnectWallet';
import { useChannelOwner } from 'contexts/channel-owner';
import { useWallet } from 'contexts/wallet';
// import * as epns from 'utils/epns';
import sl from 'utils/sl';

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
  form: {
    padding: '0 30px',
  },
  formRow: {
    margin: '10px 0',
  },
  formControl: {
    margin: '10px 0',
  },
  formButton: {},
}));

export default function Wrapper() {
  const classes = useStyles();
  const { isLoading, ownsChannel } = useChannelOwner();
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
      ) : ownsChannel ? (
        <Redirect to="/manage-channel" />
      ) : (
        <div className={classes.paddingWrapper}>
          <CreateChannel />
        </div>
      )}
    </div>
  );
}

function CreateChannel() {
  const classes = useStyles();

  const onCreate = async e => {
    e.preventDefault();
    const form = e.target;
    const props = {};
    ['name', 'info', 'url', 'icon'].forEach(key => {
      const val = form[key]?.value?.trim();
      if (val) {
        props[key] = val;
      }
    });
    console.log(props);

    sl('warning', 'Todo..');

    // await epns
    //   .ChannelOwner()
    //   .create(props.name, props.info, props.url, props.icon);

    // sl('success', 'Channel created!');

    // form.reset();
  };

  return (
    <form
      className={clsx('flex flex-col flex-grow', classes.form)}
      onSubmit={onCreate}
    >
      <div className={classes.formRow}>
        <TextField
          id="name"
          label="Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          id="url"
          label="Website"
          type="url"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          id="info"
          label="Description"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          rows={3}
          rowsMax={5}
          fullWidth
          required
        />
      </div>
      <div className={classes.formRow}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.formButton}
          type="submit"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
